const { app, BrowserWindow } = require('electron');

const menu = require('./main/menu');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function init() {
  const window = new BrowserWindow({
    width: 1024,
    height: 600,
  });

  menu.init();

  window.loadFile(path.join(__dirname, 'index.html'));
}

app.on('ready', () => {
  init();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    init();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
