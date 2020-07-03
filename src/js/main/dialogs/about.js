module.exports = { init }

const { BrowserWindow } = require('electron');
const path = require('path');

const config = require('../../config');

function init() {
  if (config.getWindow('About')) {
    return config.getWindow('About').show();
  }

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
    config.removeWindow('About');
  });

  window.setMenuBarVisibility(false);

  window.loadFile(path.join(__dirname, '../../../html/dialogs/about.html')).then(() => {
    window.webContents.send('choose-theme', config.getCurrentTheme());
  });

  window.webContents.on('did-finish-load', () => {
    config.addWindow('About', window);
  });
}
