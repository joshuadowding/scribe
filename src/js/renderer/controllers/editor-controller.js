module.exports = { init, handlers, addItemToHierarchy, clearItemsInHierarchy }

const ipc = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');

const { Item } = require('../components/item');
const theme = require('../../main/helpers/theme');

let currentSelected;

function init() {
  // Detect the system theme preference on start-up:
  let currentTheme = theme.detectTheme();
  theme.chooseTheme(currentTheme);
  ipc.ipcRenderer.send('current-theme', currentTheme); // Report the detected theme preference on-startup.

  // Allow the user to resize the editor-column elements:
  let handler = document.querySelector('.editor-handle');
  let wrapper = handler.closest('.editor-wrapper');
  let box = wrapper.querySelector('.editor-column');
  let isHandlerDragging = false;

  $(document).mousedown((event) => {
    if (event.target === handler) { isHandlerDragging = true; }
  });

  $(document).mousemove((event) => {
    if (!isHandlerDragging) { return false; }

    let pointerRelativeX = event.clientX - wrapper.offsetLeft;
    box.style.width = (Math.max(256, pointerRelativeX - 16)) + 'px';
    box.style.flexGrow = 0;
  });

  $(document).mouseup(() => { isHandlerDragging = false; });
  $(document).mouseleave(() => { isHandlerDragging = false; });

  $('#editor-add').click(function() {
    let dropdown = $('#add-dropdown');
    if (dropdown.hasClass('show')) { dropdown.removeClass('show'); }
    else { dropdown.addClass('show'); }
  });

  $('#add-file').click(function() {
    ipc.ipcRenderer.send('create-file', currentSelected);
    $('#add-dropdown').removeClass('show');
  });

  $('#add-folder').click(function() {
    ipc.ipcRenderer.send('create-folder', currentSelected);
    $('#add-dropdown').removeClass('show');
  });

  $('.editor-items').on('click', '.item', function() {
    $(this).parent().each(() => { $('.item').removeClass('selected'); });

    if ($(this).hasClass('selected')) { $(this).removeClass('selected'); }
    else { $(this).addClass('selected'); currentSelected = $(this).data('id'); }
  });
}

function handlers() {
  ipc.ipcRenderer.on('toggle-theme', () => {
    ipc.ipcRenderer.send('current-theme', theme.toggleTheme());
  });

  ipc.ipcRenderer.on('detect-theme', () => {
    let currentTheme = theme.detectTheme();
    theme.chooseTheme(currentTheme);
    ipc.ipcRenderer.send('current-theme', currentTheme);
  });

  ipc.ipcRenderer.on('update-project', (error, data) => {
    //$('#item-list').empty(); // Empty the item-list before we re-populate it.
    controller.clearItemsInHierarchy(document.getElementById('item-list'));
    controller.addItemToHierarchy(data, document.getElementById('item-list'));
  });
}

function addItemToHierarchy(data, parent) {
  ReactDOM.render(<Item items={data} />, parent);
}

function clearItemsInHierarchy(parent) {
  ReactDOM.unmountComponentAtNode(parent);
}
