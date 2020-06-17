module.exports = { init }

const { app, Menu } = require('electron');

const about = require('./dialogs/about');
const config = require('../config');

const template = [{
    label: 'Scribe',
    submenu: [
      { label: 'About', click: () => about.init() },
      { label: 'Quit', click: () => app.quit() }
    ]
  }, {
    label: 'View',
    submenu: [
      { label: 'Toggle Light/Dark Theme', click: () => toggleTheme() },
      { type: 'separator' },
      { label: 'Toggle OS-based Theme', click: () => detectTheme() },
      { label: 'Toggle Time-based Theme' }
    ]
  }
];

function init() {
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function toggleTheme() {
  // TODO: Support sending a signal to the renderer process to toggle the theme.
  config.getWindow('Editor').webContents.send('toggle-theme', 'Test');
}

function detectTheme() {
  // TODO: Support sending a signal to the renderer process to toggle the theme.
  config.getWindow('Editor').webContents.send('detect-theme', 'Test');
}
