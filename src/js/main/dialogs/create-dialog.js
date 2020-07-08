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

const HTML_PATH = '../../../html/dialogs/create-dialog.html';
const INVALID_INPUT = 'Warning: Invalid name. Please enter a valid name.';

class CreateDialog {
  window;

  constructor(options) { this.init(options); }

  init(options) {
    if (config.getWindow('Create')) {
      return config.getWindow('Create').show();
    }

    type = options['type'];
    selected = options['selected'];

    this.window = new BrowserWindow({
      title: 'Scribe',
      width: 480,
      height: 320,
      resizable: false,
      maximizable: false,
      minimizable: false,
      center: true,
      modal: true,
      parent: config.getWindow('Editor'),
      webPreferences: { nodeIntegration: true },
      autoHideMenuBar: true
    });

    this.window.once('closed', () => {
      config.removeWindow('Create');
    });

    this.window.webContents.on('did-finish-load', () => {
      config.addWindow('Create', this.window);
    });

    this.window.loadFile(path.join(__dirname, HTML_PATH)).then(() => {
      this.window.webContents.send('choose-theme', config.getCurrentTheme());
    });

    this.listen();
  }

  listen() {
    ipcMain.once('form-create', (event, message) => {
      let item = null;
      let input = validator.escape(message);

      if (validator.isEmpty(input)) {
        this.window.webContents.send('create-failure', INVALID_INPUT);
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
        if (selected !== null) {
          common.getHierarchyIndex(config.getCurrentProject().Hierarchy, item, selected);
        } else { config.getCurrentProject().Hierarchy.push(item); }
      }

      common.writeDataFile(config.getCurrentProject().FilePath, JSON.stringify(config.getCurrentProject()));
      this.window.destroy();
    });

    ipcMain.once('form-cancel', () => {
      this.window.destroy();
    });
  }
}

module.exports = { CreateDialog }
