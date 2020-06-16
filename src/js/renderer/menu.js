module.exports = { init }

const { app, Menu } = require('electron');
const about = require('./dialogs/about');
const theme = require('./theme');

const template = [{
    label: 'Scribe',
    submenu: [
      { label: 'About', click: () => about.init() },
      { label: 'Quit', click: () => app.quit() }
    ]
  }, {
    label: 'View',
    submenu: [
      { label: 'Toggle Light/Dark Theme', click: () => theme.toggleTheme() },
      { type: 'separator' },
      { label: 'Toggle OS-based Theme', click: () => theme.detectTheme() },
      { label: 'Toggle Time-based Theme' }
    ]
  }
];

function init() {
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
