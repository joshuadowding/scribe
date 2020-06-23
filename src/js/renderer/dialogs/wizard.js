module.exports = { init }

const { BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const Project = require('../../main/models/project');
const config = require('../../config');
const common = require('../../common');

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
    let project = new Project();
    let response = new Map(message);

    project.setName(response.get('project-name'));
    project.setAuthor(response.get('project-author'));
    project.setPath(response.get('project-path'));
    project.setHierarchy([]);

    let data = JSON.stringify(project);
    let filepath = path.join(project.getPath(), project.getName());
    let filename = path.join(filepath, project.getName() + ".scri");

    let check = common.checkDirectoryExists(filepath);
    if (!check) { common.createDataDirectory(filepath); }

    check = common.checkDirectoryExists(filename);
    if (!check) { common.writeDataFile(filename, data); }

    config.setCurrentProject(project);
    window.destroy(); // NOTE: Because we catch the 'close' event; let's just destroy it.
  });

  ipcMain.on('choose-path', () => {
    dialog.showOpenDialog(window, {
      properties: ['openDirectory']
    }).then((result) => {
      if (result.canceled) { ipcMain.send('path-chosen', null); }
      else { window.webContents.send('path-chosen', result.filePaths); }
    });
  });

  //window.webContents.openDevTools(); // DEBUG: Disable when not required.
}
