module.exports = { init }

const { BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const change = require('on-change');
const validator = require('validator');

const Project = require('../models/project');
const config = require('../../config');
const common = require('../../common');

const INVALID_NAME = 'Warning: Invalid name. Please enter a valid name.';
const INVALID_AUTH = 'Warning: Invalid author. Please enter a valid author.';
const INVALID_PATH = 'Warning: Invalid path. Please enter a valid path.';

function init() {
  if (config.getWindow('Wizard')) {
    return config.getWindow('Wizard').show();
  }

  const window = new BrowserWindow({
    width: 640,
    height: 480,
    resizable: true,
    skipTaskbar: false,
    maximizable: false,
    minimizable: false,
    title: 'Scribe',
    center: true,
    fullscreen: false,
    modal: true,
    parent: config.getWindow('Editor'),
    webPreferences: { nodeIntegration: true }
  });

  window.once('closed', () => {
    config.removeWindow('Wizard');
  });

  window.setMenuBarVisibility(false);

  window.loadFile(path.join(__dirname, '../../../html/dialogs/wizard.html')).then(() => {
    window.webContents.send('choose-theme', config.getCurrentTheme());
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('Wizard', window);
  });

  window.on('close', (event) => {
    event.preventDefault();

    const options = { type: 'question', buttons: ['Yes', 'No'], title: 'Quit', message: 'Are you sure you\'d like to quit Scribe?' };
    const response = dialog.showMessageBoxSync(window, options);

    if (response === 0) {
      window.destroy();
      config.getWindow('Editor').destroy();
    }
  });

  ipcMain.on('create-project', (event, message) => {
    let response = new Map(message);

    let projectName = validator.escape(response.get('project-name'));
    let projectAuthor = validator.escape(response.get('project-author'));
    let projectPath = response.get('project-path');

    if (validator.isEmpty(projectName)) {
      window.webContents.send('create-failure', INVALID_NAME);
      return;
    }

    if (validator.isEmpty(projectAuthor)) {
      window.webContents.send('create-failure', INVALID_AUTH);
      return;
    }

    let project = new Project({
      name: projectName,
      author: projectAuthor,
      projectPath: projectPath
    });

    let data = JSON.stringify(project);
    let filepath = path.join(project.ProjectPath, project.Name);
    let filename = project.FilePath = path.join(filepath, project.Name + ".scri");

    let check = common.checkPathExists(filepath);
    if (!check) { common.createDataDirectory(filepath); }

    check = common.checkPathExists(filename);
    if (!check) { common.createDataFile(filename, data); }

    config.setCurrentProject(change(project, () => config.getWindow('Editor').update(), {
      pathAsArray: true,
      ignoreUnderscores: true,
      ignoreSymbols: true
    }));

    config.getWindow('Editor').update();
    window.destroy(); // NOTE: Because we catch the 'close' event; let's just destroy it.
  });

  ipcMain.on('load-project', () => {
    const options = {
      title: 'Scribe',
      properties: ['openFile'],
      defaultPath: path.join(config.getDataDir()),
      filters: [{ name: 'Scribe Project', extensions: ['scri'] }]
    }

    dialog.showOpenDialog(window, options).then((result) => {
      if (result.canceled) { window.webContents.send('path-chosen', null); }
      else {
        const project = common.readProjectFile(result.filePaths[0]);

        if (project !== undefined) {
          config.setCurrentProject(change(project, () => config.getWindow('Editor').update(), {
            pathAsArray: true,
            ignoreUnderscores: true,
            ignoreSymbols: true
          }));

          config.getWindow('Editor').update();
          window.destroy(); // NOTE: Because we catch the 'close' event; let's just destroy it.
        } else {
          const options = { type: 'error', buttons: ['Ok'], title: 'Error', message: 'Unable to parse project file. Please try again.' };
          dialog.showMessageBoxSync(window, options);
        }
      }
    });
  });

  ipcMain.on('choose-path', () => {
    const options = {
      title: 'Scribe',
      properties: ['openDirectory'],
      defaultPath: path.join(config.getDataDir())
    }

    dialog.showOpenDialog(window, options).then((result) => {
      if (result.canceled) { window.webContents.send('path-chosen', null); }
      else { window.webContents.send('path-chosen', result.filePaths); }
    });
  });
}
