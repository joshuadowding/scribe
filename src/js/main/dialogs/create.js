module.exports = { init }

const { BrowserWindow, ipcMain } = require('electron');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const validator = require('validator');

const File = require('../models/document');
const Folder = require('../models/folder');
const config = require('../../config');
const common = require('../../common');

let type = undefined;
let selected = undefined;

const INVALID_INPUT = 'Warning: Invalid name. Please enter a valid name.';

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

  window.loadFile(path.join(__dirname, '../../../html/dialogs/create.html')).then(() => {
    window.webContents.send('choose-theme', config.getCurrentTheme());
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('Create', window);
  });

  ipcMain.once('form-create', (event, message) => {
    let item = null;
    let input = validator.escape(message);

    if (validator.isEmpty(input)) {
      window.webContents.send('create-failure', INVALID_INPUT);
      return;
    }

    if (type === 'File') {
      item = new File({
        id: uuidv4(),
        name: input,
        path: path.join(config.getCurrentProject().ProjectPath, (message + ".md"))
      });
    } else if (type === 'Folder') {
      item = new Folder({
        id: uuidv4(),
        name: input,
        path: path.join(config.getCurrentProject().ProjectPath, message)
      });
    }

    if (item !== null) {
      if (selected !== undefined) {
        let index = config.getCurrentProject().getHierarchyIndex(selected);
        let selectedItem = config.getCurrentProject().Hierarchy[index];

        if (selectedItem instanceof Folder) {
          config.getCurrentProject().Hierarchy[index].Hierarchy.push(item);
        } else {
          config.getCurrentProject().Hierarchy.push(item);
        }
      } else { config.getCurrentProject().Hierarchy.push(item); }
    }

    common.writeDataFile(config.getCurrentProject().FilePath, JSON.stringify(config.getCurrentProject()));
    window.destroy();
  });

  ipcMain.once('form-cancel', () => {
    window.destroy();
  });
}
