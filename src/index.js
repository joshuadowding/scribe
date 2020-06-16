const { app, BrowserWindow } = require('electron');

const main = require('./js/main/index');
const renderer = require('./js/renderer/index');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if(require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', () => {
  init();
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    init();
  }
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function init() {
  main.init();
  renderer.init();
}
