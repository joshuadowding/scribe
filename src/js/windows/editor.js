module.exports = { init, update }

const { BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron');
const path = require('path');

const Folder = require('../models/folder');
const File = require('../models/document');

const config = require('../config');
const menu = require('../helpers/menu');
const wizard = require('../dialogs/wizard');
const create = require('../dialogs/create');

function init() {
  if (config.getWindow('Editor')) {
    return config.getWindow('Editor').show();
  }

  BrowserWindow.prototype.update = (options) => {
    update(options);
  };

  const window = new BrowserWindow({
    width: 1024,
    height: 600,
    resizable: true,
    skipTaskbar: false,
    maximizable: true,
    minimizable: true,
    title: 'Scribe',
    center: true,
    fullscreen: false,
    webPreferences: { nodeIntegration: true }
  });

  window.once('closed', () => {
    config.removeWindow('Editor');
  });

  window.loadFile(path.join(__dirname, '../../html/index.html')).then(() => {
    nativeTheme.themeSource = 'system';

    menu.init();
    wizard.init();
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('Editor', window);
  });

  window.on('close', (event) => {
    event.preventDefault();

    const options = { type: 'question', buttons: ['Yes', 'No'], title: 'Quit', message: 'Are you sure you\'d like to quit Scribe?' }
    const response = dialog.showMessageBoxSync(window, options);
    if (response === 0) { window.destroy(); }
  });

  ipcMain.on('current-theme', (event, message) => {
    config.setCurrentTheme(message);
  });

  ipcMain.on('create-file', () => {
    create.init({ type: 'File', selected: undefined });
  });

  ipcMain.on('create-folder', () => {
    create.init({ type: 'Folder', selected: undefined });
  });

  window.webContents.openDevTools(); // DEBUG: Disable when not required.
}

function update(options) {
  if (options !== undefined) {
    let values = options._value;
    let hierarchy = [];

    for (let i = 0; i < values.length; i++) {
      if (values[i] instanceof Folder) {
        hierarchy.push(values[i]._folderName);
      } else if (values[i] instanceof File) {
        hierarchy.push(values[i]._documentName);
      }
    }

    config.getWindow('Editor').webContents.send('update-project', hierarchy);
  }
}
