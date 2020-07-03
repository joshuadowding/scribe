module.exports = { handlers }

const { ipcRenderer } = require('electron');

const theme = require('../../main/helpers/theme');

function handlers() {
  ipcRenderer.on('choose-theme', (event, message) => {
    theme.chooseTheme(message);
  });
}
