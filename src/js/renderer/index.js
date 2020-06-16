module.exports = { init }

const { BrowserWindow } = require('electron');
const path = require('path');

const menu = require('./menu');

function init() {
  if (exports.editor) {
    return exports.editor.show();
  }

  const window = exports.editor = new BrowserWindow({
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
    exports.editor = null;
  });

  window.webContents.on('did-finish-load', () => {

  });

  window.webContents.openDevTools();

  window.loadFile(path.join(__dirname, '../../html/index.html')).then(() => {
    menu.init();
  });
}


