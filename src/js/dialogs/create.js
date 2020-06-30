module.exports = { init }

const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const File = require('../models/document');
const Folder = require('../models/folder');
const config = require('../config');
const common = require('../common');

let type = undefined;
let selected = undefined;

function init(options) {
  if (config.getWindow('Create')) {
    return config.getWindow('Create').show();
  }

  type = options['type'];
  selected = options['selected'];

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
  });

  window.setMenuBarVisibility(false);

  window.loadFile(path.join(__dirname, '../../html/dialogs/create.html')).then(() => {
    window.webContents.send('choose-theme', config.getCurrentTheme());
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('Create', window);
  });

  ipcMain.once('form-create', (event, message) => {
    let item = null;

    if (type === 'File') {
      item = new File({
        name: message, // TODO: Sanitize input.
        path: path.join(config.getCurrentProject().ProjectPath, (message + ".md"))
      });
    }
    else if (type === 'Folder') {
      item = new Folder({
        name: message, // TODO: Sanitize input.
        path: path.join(config.getCurrentProject().ProjectPath, message)
      });
    }

    if (item !== null) { config.getCurrentProject().Hierarchy.push(item); }

    common.writeDataFile(config.getCurrentProject().FilePath, JSON.stringify(config.getCurrentProject()));
    window.destroy();
  });

  ipcMain.once('form-cancel', () => {
    window.destroy();
  });

  //window.webContents.openDevTools(); // DEBUG: Disable when not required.
}
