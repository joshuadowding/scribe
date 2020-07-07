module.exports = { init, update }

const { BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron');
const path = require('path');

const Folder = require('../models/folder');
const File = require('../models/document');

const { WizardDialog } = require('../dialogs/wizard-dialog');
const { CreateDialog } = require('../dialogs/create-dialog');
const config = require('../../config');
const menu = require('../helpers/menu');

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

  window.loadFile(path.join(__dirname, '../../../html/index.html')).then(() => {
    nativeTheme.themeSource = 'system';

    menu.init();
    new WizardDialog();
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

  ipcMain.on('create-file', (event, data) => {
    new CreateDialog({ type: 'File', selected: data });
  });

  ipcMain.on('create-folder', (event, data) => {
    new CreateDialog({ type: 'Folder', selected: data });
  });
}

function update() {
  let list = [];
  populate(config.getCurrentProject().Hierarchy, list);
  config.getWindow('Editor').webContents.send('update-project', list);
}

function populate(hierarchy, list) {
  for (let i = 0; i < hierarchy.length; i++) {
    if (hierarchy[i] instanceof Folder) {
      let folderItems = [];

      if (hierarchy[i]._folderHierarchy.length !== 0) {
        populate(hierarchy[i]._folderHierarchy, folderItems); // Recurse
      }

      list.push({
        id: hierarchy[i]._objectID,
        type: hierarchy[i]._objectType,
        name: hierarchy[i]._folderName,
        hierarchy: folderItems
      });
    } else if (hierarchy[i] instanceof File) {
      list.push({
        id: hierarchy[i]._objectID,
        type: hierarchy[i]._objectType,
        name: hierarchy[i]._documentName
      });
    }
  }
}
