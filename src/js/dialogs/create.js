module.exports = { init }

const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const File = require('../models/document');
const Folder = require('../models/folder');
const config = require('../config');
const common = require('../common');

function init(option) {
  if (config.getWindow('Create')) {
    return config.getWindow('Create').show();
  }

  const window = new BrowserWindow({
    width: 480,
    height: 320,
    resizable: false,
    skipTaskbar: true,
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
    config.removeWindow('Create');
  })

  window.setMenuBarVisibility(false);

  window.loadFile(path.join(__dirname, '../../html/dialogs/create.html')).then(() => {
    window.webContents.send('choose-theme', config.getCurrentTheme());
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('About', window);
  });

  ipcMain.on('form-create', (event, message) => {
    switch(option) {
      case 'File':
        let file = new File();
        file.setName(message); // TODO: Sanitize input.
        file.setPath(path.join(config.getCurrentProject().getPath(), message + ".md"));
        config.getCurrentProject().getHierarchy().push(file);
        break;

      case 'Folder':
        let folder = new Folder();
        folder.setName(message); // TODO: Sanitize input.
        folder.setHierarchy([]);
        folder.setPath(path.join(config.getCurrentProject().getPath(), message));
        config.getCurrentProject().getHierarchy().push(folder);
        break;
    }

    console.log(config.getCurrentProject());
    window.destroy();
  });

  ipcMain.on('form-cancel', () => {
    window.destroy();
  });

  //window.webContents.openDevTools(); // DEBUG: Disable when not required.
}
