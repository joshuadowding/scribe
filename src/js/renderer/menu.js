module.exports = { init }

const { app, Menu } = require('electron');
const about = require('./dialogs/about');

const template = [{
    label: 'Scribe',
    submenu: [
      { label: 'About', click: () => about.init() },
      { label: 'Quit', click: () => app.quit() }
    ]
  }
];

function init() {
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
