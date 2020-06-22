module.exports = { init }

const { BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const Project = require('../../main/models/project');
const config = require('../../config');

function init() {
  if (config.getWindow('Wizard')) {
    return config.getWindow('Wizard').show();
  }

  const window = new BrowserWindow({
    width: 640,
    height: 480,
    resizable: false,
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
    window.setAlwaysOnTop(true);
    window.webContents.send('choose-theme', config.getCurrentTheme());
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('Wizard', window);
  });

  ipcMain.on('create-project', (event, message) => {
    let project = new Project();
    let response = new Map(message);

    project.setName(response.get('project-name'));
    project.setAuthor(response.get('project-author'));
    project.setPath(response.get('project-path'));
    project.setHierarchy([]);

    config.setCurrentProject(project);
    window.close();
  });

  ipcMain.on('choose-path', () => {
    dialog.showOpenDialog(window, {
      properties: ['openDirectory']
    }).then((result) => {
      if (result.canceled) { ipcMain.send('path-chosen', null); }
      else { window.webContents.send('path-chosen', result.filePaths); }
    });
  });
}
