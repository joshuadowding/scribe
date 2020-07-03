module.exports = { init, handlers }

const { ipcRenderer } = require('electron');

const theme = require('../../main/helpers/theme');

function init() {
  $('.input-form').submit(function(event) {
    event.preventDefault();
    let input = $('#input-name').val().toString().trim();
    ipcRenderer.send('form-create', input);
  });

  $('#cancel').click(function() {
    ipcRenderer.send('form-cancel'); // Destroy the window on cancel.
  });
}

function handlers() {
  ipcRenderer.on('choose-theme', (event, message) => {
    theme.chooseTheme(message);
  });

  ipcRenderer.on('create-failure', (event, message) => {
    // TODO: Handle invalid input.
  });
}
