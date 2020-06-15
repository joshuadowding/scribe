module.exports = { init }

const { app, Menu } = require('electron');
const project = require ('./project');

function init() {
  let menu = Menu.buildFromTemplate(build());
  Menu.setApplicationMenu(menu);
}

function build() {
  return [
    {
      label: 'Scribe',
      submenu: [
        { label: 'New Project', click: () => project.create() },
        { label: 'Load Project', click: () => project.load() },
        { type: 'separator' },
        { label: 'About' },
        { label: 'Quit', click: () => app.quit() }
      ]
    }
  ];
}
