module.exports = { init }

const { BrowserWindow } = require('electron');
const path = require('path');

function init() {
  const window = new BrowserWindow({
    width: 1024,
    height: 600,
  });
  
  window.loadFile(path.join(__dirname, './html/index.html'));
}
