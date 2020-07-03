const { ipcRenderer } = require('electron');

const theme = require('../../main/helpers/theme');

class AboutController {
  constructor() { this.init(); }

  init() { this.handlers(); }

  handlers() {
    ipcRenderer.on('choose-theme', (event, data) => {
      theme.chooseTheme(data);
    });
  }
}

module.exports = { AboutController }
