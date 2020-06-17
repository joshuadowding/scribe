module.exports = { init }

const { BrowserWindow } = require('electron');
const path = require('path');

const config = require('../config');
const menu = require('./menu');

function init() {
  if (config.getWindow('Editor')) {
    return config.getWindow('Editor').show();
  }

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
    menu.init();
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('Editor', window);
  });
}


