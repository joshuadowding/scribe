const { BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const change = require('on-change');
const validator = require('validator');

const Project = require('../models/project');
const config = require('../../config');
const common = require('../../common');

const HTML_PATH = '../../../html/dialogs/wizard-dialog.html';

const INVALID_NAME = 'Warning: Invalid name. Please enter a valid name.';
const INVALID_AUTH = 'Warning: Invalid author. Please enter a valid author.';
const INVALID_PATH = 'Warning: Invalid path. Please enter a valid path.';
const PROJ_EXISTS = 'Warning: A project has been created here already. Please select another location.';

class WizardDialog {
  window;

  constructor() { this.init(); }

  init() {
    if (config.getWindow('Wizard')) {
      return config.getWindow('Wizard').show();
    }

    this.window = new BrowserWindow({
      title: 'Scribe',
      width: 640,
      height: 480,
      resizable: true,
      maximizable: false,
      minimizable: false,
      center: true,
      modal: true,
      parent: config.getWindow('Editor'),
      webPreferences: { nodeIntegration: true },
      autoHideMenuBar: true
    });

    this.window.once('closed', () => {
      config.removeWindow('Wizard');
    });

    this.window.webContents.on('did-finish-load', () => {
      config.addWindow('Wizard', this.window);
    });

    this.window.loadFile(path.join(__dirname, HTML_PATH)).then(() => {
      this.window.webContents.send('choose-theme', config.getCurrentTheme());
    });

    this.window.on('close', (event) => {
      event.preventDefault();

      if (!config.getFirstRun()) {
        this.window.destroy();
      } else {
        const options = { type: 'question', buttons: ['Yes', 'No'], title: 'Quit', message: 'Are you sure you\'d like to quit Scribe?' };
        const response = dialog.showMessageBoxSync(this.window, options);

        if (response === 0) {
          config.getWindow('Editor').destroy();
          this.window.destroy();
        }
      }
    });

    this.listen();
  }

  listen() {
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

      let filepath = project.DocumentPath = path.join(project.ProjectPath, project.Name);
      let filename = project.FilePath = path.join(filepath, project.Name + ".scri");

      let check = common.checkPathExists(filepath);
      if (!check) { common.createDataDirectory(filepath); }
      else {
        const options = { type: 'error', buttons: ['Ok'], title: 'Warning', message: PROJ_EXISTS };
        const response = dialog.showMessageBoxSync(this.window, options);
        if (response === 0) { return; }
      }

      check = common.checkPathExists(filename);
      if (check) {
        const options = { type: 'error', buttons: ['Ok'], title: 'Warning', message: PROJ_EXISTS };
        const response = dialog.showMessageBoxSync(this.window, options);
        if (response === 0) { return; }
      }

      config.setCurrentProject(change(project, () => config.getWindow('Editor').update(), {
        pathAsArray: true,
        ignoreUnderscores: true,
        ignoreSymbols: true
      }));

      config.setFirstRun(false);
      config.getWindow('Editor').update(); // Will serialize the project object here.
      this.window.destroy(); // NOTE: Because we catch the 'close' event; let's just destroy it.
    });

    ipcMain.on('load-project', () => {
      const options = {
        title: 'Scribe',
        properties: ['openFile'],
        defaultPath: path.join(config.getDataDir()),
        filters: [{ name: 'Scribe Project', extensions: ['scri'] }]
      }

      dialog.showOpenDialog(this.window, options).then((result) => {
        if (result.canceled) { this.window.webContents.send('path-chosen', null); }
        else {
          const project = common.readProjectFile(result.filePaths[0]);

          if (project !== undefined) {
            config.setCurrentProject(change(project, () => config.getWindow('Editor').update(), {
              pathAsArray: true,
              ignoreUnderscores: true,
              ignoreSymbols: true
            }));

            config.setFirstRun(false);
            config.getWindow('Editor').update();
            this.window.destroy(); // NOTE: Because we catch the 'close' event; let's just destroy it.
          } else {
            const options = { type: 'error', buttons: ['Ok'], title: 'Error', message: 'Unable to parse project file. Please try again.' };
            dialog.showMessageBoxSync(this.window, options);
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

      dialog.showOpenDialog(this.window, options).then((result) => {
        if (result.canceled) { this.window.webContents.send('path-chosen', null); }
        else { this.window.webContents.send('path-chosen', result.filePaths); }
      });
    });
  }
}

module.exports = { WizardDialog }
