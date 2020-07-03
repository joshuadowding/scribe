const { BrowserWindow } = require('electron');
const path = require('path');

const config = require('../../config');

const HTML_PATH = '../../../html/dialogs/about-dialog.html';

class AboutDialog {
  window;

  constructor() { this.init(); }

  init() {
    if (config.getWindow('About')) {
      return config.getWindow('About').show();
    }

    this.window = new BrowserWindow({
      title: 'Scribe',
      width: 480,
      height: 320,
      resizable: false,
      maximizable: false,
      minimizable: false,
      center: true,
      modal: true,
      parent: config.getWindow('Editor'), // NOTE: Assumes the 'Editor' window exists.
      webPreferences: { nodeIntegration: true },
      autoHideMenuBar: true
    });

    this.window.once('closed', () => {
      config.removeWindow('About');
    });

    this.window.webContents.on('did-finish-load', () => {
      config.addWindow('About', this.window);
    });

    this.window.loadFile(path.join(__dirname, HTML_PATH)).then(() => {
      this.window.webContents.send('choose-theme', config.getCurrentTheme());
    });
  }
}

module.exports = { AboutDialog }
