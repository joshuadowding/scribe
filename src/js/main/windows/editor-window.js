const { BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const Folder = require('../models/folder');
const File = require('../models/document');
const Node = require('../models/node');

const { WizardDialog } = require('../dialogs/wizard-dialog');
const { CreateDialog } = require('../dialogs/create-dialog');
const config = require('../../config');
const common = require('../../common');
const menu = require('../helpers/menu');

const HTML_PATH = '../../../html/windows/editor-window.html';

class EditorWindow {
  window;

  constructor() { this.init(); }

  init() {
    if (config.getWindow('Editor')) {
      return config.getWindow('Editor').show();
    }

    BrowserWindow.prototype.update = () => {
      this.update();
    };

    this.window = new BrowserWindow({
      title: 'Scribe',
      width: 1024,
      height: 600,
      resizable: true,
      maximizable: true,
      minimizable: true,
      center: true,
      fullscreen: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });

    this.window.once('closed', () => {
      config.removeWindow('Editor');
    });

    this.window.webContents.on('did-finish-load', () => {
      config.addWindow('Editor', this.window);
    });

    this.window.loadFile(path.join(__dirname, HTML_PATH)).then(() => {
      nativeTheme.themeSource = 'system';
      menu.init();
      new WizardDialog();
    });

    this.window.on('close', (event) => {
      event.preventDefault();

      const options = { type: 'question', buttons: ['Yes', 'No'], title: 'Quit', message: 'Are you sure you\'d like to quit Scribe?' }
      const response = dialog.showMessageBoxSync(this.window, options);
      if (response === 0) { this.window.destroy(); }
    });

    this.listen();
  }

  listen() {
    ipcMain.on('current-theme', (event, message) => {
      config.setCurrentTheme(message);
    });

    ipcMain.on('create-file', (event, data) => {
      new CreateDialog({ type: 'File', selected: data });
    });

    ipcMain.on('create-folder', (event, data) => {
      new CreateDialog({ type: 'Folder', selected: data });
    });

    ipcMain.on('create-node', (event, data) => {
      let node = new Node({ id: uuidv4(),  content: '' });
      let document = common.getItemFromProjectHierarchy(data.id);

      let nodePath = path.join(document.Path, (document.Nodes.length + '.md'));
      node.ContentPath = nodePath;
      common.addNodeToDocument(node, data.id);

      common.createDataFile(nodePath, '');
      common.createDataFile(config.getCurrentProject().FilePath, JSON.stringify(config.getCurrentProject()));

      this.refresh(data); // Fetch the document again, this time with updated nodes.
    });

    ipcMain.on('select-item', (event, data) => {
      this.refresh(data);
    });

    ipcMain.on('remove-item', (event, data) => {
      const options = { type: 'question', buttons: ['Yes', 'No'], title: 'Quit', message: 'Are you sure you\'d like to remove this item?' }
      const response = dialog.showMessageBoxSync(config.getWindow('Editor'), options);
      if (response === 0) { common.removeItemFromProjectHierarchy(data.id); }
    });
  }

  update() {
    let list = [];
    this.populate(config.getCurrentProject().Hierarchy, list);
    config.getWindow('Editor').webContents.send('update-project', list);
    common.createDataFile(config.getCurrentProject().FilePath, JSON.stringify(config.getCurrentProject()));
  }

  populate(hierarchy, list) {
    for (let i = 0; i < hierarchy.length; i++) {
      if (hierarchy[i] instanceof Folder) {
        let folderItems = [];

        if (hierarchy[i]._folderHierarchy.length !== 0) {
          this.populate(hierarchy[i]._folderHierarchy, folderItems); // Recurse
        }

        list.push({
          id: hierarchy[i]._objectID,
          type: hierarchy[i]._objectType.toLowerCase(),
          name: hierarchy[i]._folderName,
          hierarchy: folderItems
        });
      } else if (hierarchy[i] instanceof File) {
        list.push({
          id: hierarchy[i]._objectID,
          type: hierarchy[i]._objectType.toLowerCase(),
          name: hierarchy[i]._documentName
        });
      }
    }
  }

  refresh(data) {
    let document = common.getItemFromProjectHierarchy(data.id);

    for (let index = 0; index < document.Nodes.length; index++) {
      let model = common.loadDataFile(document, document.Nodes[index].ContentPath);
      document.Nodes[index].Content = model.Content;
    }

    let nodes = JSON.stringify(document.Nodes);
    this.window.webContents.send('update-document', { nodes: nodes });
  }
}

module.exports = { EditorWindow }
