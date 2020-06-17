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
      { label: 'Toggle Light/Dark Theme', click: () => {
        config.getWindow('Editor').webContents.send('toggle-theme');
      }},
      { label: 'Detect OS-based Theme', click: () => {
        config.getWindow('Editor').webContents.send('detect-theme');
      }}
    ]
  }
];

function init() {
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
