module.exports = { init }

const { BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron');
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
    nativeTheme.themeSource = 'system';
    menu.init();
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
}
