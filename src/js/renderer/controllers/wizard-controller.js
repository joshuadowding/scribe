module.exports = { init, handlers }

const { ipcRenderer } = require('electron');

const theme = require('../../main/helpers/theme');

function init() {
  $('.input-form').submit(function(event) {
    event.preventDefault();

    let project = new Map();
    project.set('project-name', $('#input-name').val().toString().trim());
    project.set('project-author', $('#input-author').val().toString().trim());
    project.set('project-path', $('#input-path').val().toString().trim());

    ipcRenderer.send('create-project', project);
  });

  $('#new-project').click(function() {
    $('#welcome-page').removeClass('show');
    $('#project-page').addClass('show');
  });

  $('#load-project').click(function(event) {
    event.preventDefault();
    ipcRenderer.send('load-project');
  });

  $('#page-back').click(function() {
    $('#welcome-page').addClass('show');
    $('#project-page').removeClass('show');
  });

  $('#input-path-choose').click(function(event) {
    event.preventDefault();
    ipcRenderer.send('choose-path');
  });
}

function handlers() {
  ipcRenderer.on('choose-theme', (event, message) => {
    theme.chooseTheme(message);
  });

  ipcRenderer.on('create-failure', (event, message) => {
    // TODO: Handle invalid input.
  });

  ipcRenderer.on('path-chosen', (event, message) => {
    $('#input-path').val(message);
    $('#input-path-choose').val(message);
  });
}
