module.exports = { init }

const { BrowserWindow } = require('electron');
const path = require('path');

const editor = require('../../renderer').editor;

function init() {
  if (exports.about) {
    return exports.about.show();
  }

  const window = exports.about = new BrowserWindow({
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
    parent: editor,
    webPreferences: { nodeIntegration: true }
  });

  window.once('closed', () => {
    exports.about = null;
  });

  window.loadFile(path.join(__dirname, '../../../html/dialogs/about.html')).then(() => {
    window.setAlwaysOnTop(true);
    window.setMenuBarVisibility(false);
  });
}
