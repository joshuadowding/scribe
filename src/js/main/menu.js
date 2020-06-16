module.exports = { init }

const { app, Menu } = require('electron');

function init() {
  let menu = Menu.buildFromTemplate(build());
  Menu.setApplicationMenu(menu);
}

function build() {
  return [
    {
      label: 'Scribe',
      submenu: [
        { label: 'About' },
        { label: 'Quit', click: () => app.quit() }
      ]
    }
  ];
}
