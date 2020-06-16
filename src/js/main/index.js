module.exports = { init }

//const { app, BrowserWindow } = require('electron');

const menu = require('./menu');

function init() {
  menu.init();
}
