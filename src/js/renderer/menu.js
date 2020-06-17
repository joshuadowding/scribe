module.exports = { init }

const { app, Menu } = require('electron');

const about = require('./dialogs/about');
const config = require('../config');

let toggleDevTools = false;

const template = [
  {
    label: 'Scribe',
    submenu: [
      { label: 'About', click: () => about.init() },
      { label: 'Quit', role: 'close', click: () => app.quit() }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', role: 'undo' },
      { label: 'Redo', role: 'redo', },
      { type: 'separator' },
      { label: 'Cut', role: 'cut' },
      { label: 'Copy', role: 'copy' },
      { label: 'Paste', role: 'paste' },
      { label: 'Delete', role: 'delete' },
      { type: 'separator' },
      { label: 'Select All', role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Full Screen', type: 'checkbox',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
        click: () => {
          let editor = config.getWindow('Editor');
          editor.setFullScreen(!editor.isFullScreen());
        }
      },
      {
        label: 'Float Window', type: 'checkbox',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Command+W' : 'F10',
        click: () => {
          let editor = config.getWindow('Editor');
          editor.setAlwaysOnTop(!editor.isAlwaysOnTop());
        }
      },
      { type: 'separator' },
      {
        label: 'Theme',
        submenu: [
          {
            label: 'Toggle Theme', click: () => {
              config.getWindow('Editor').webContents.send('toggle-theme');
            }
          },
          {
            label: 'Detect Theme', click: () => {
              config.getWindow('Editor').webContents.send('detect-theme');
            }
          }
        ]
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Command+D' : 'F12',
        click: () => {
          if (!toggleDevTools) {
            toggleDevTools = true;
            config.getWindow('Editor').webContents.openDevTools();
          } else {
            toggleDevTools = false;
            config.getWindow('Editor').webContents.closeDevTools();
          }
        }
      }
    ]
  }
];

function init() {
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
