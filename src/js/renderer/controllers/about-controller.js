const { ipcRenderer } = require('electron');

const theme = require('../../main/helpers/theme');

class AboutController {
  constructor() { this.init(); }

  init() { this.listen(); }

  listen() {
    ipcRenderer.on('choose-theme', (event, data) => {
      theme.chooseTheme(data);
    });
  }
}

module.exports = { AboutController }
