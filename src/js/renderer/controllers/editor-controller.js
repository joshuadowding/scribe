const { ipcRenderer } = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');

const { ItemComponent } = require('../components/item-component');
const theme = require('../../main/helpers/theme');

let currentSelected;

class EditorController {
  constructor() { this.init(); }

  init() {
    // Detect the system theme preference on start-up:
    let currentTheme = theme.detectTheme();
    theme.chooseTheme(currentTheme);
    ipcRenderer.send('current-theme', currentTheme); // Report the detected theme preference on-startup.

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
      if ($(currentSelected).hasClass('item-folder')) {
        ipcRenderer.send('create-file', $(currentSelected).data('id'));
      } else {
        ipcRenderer.send('create-file', null);
      }

      $('#add-dropdown').removeClass('show');
    });

    $('#add-folder').click(function() {
      if ($(currentSelected).hasClass('item-folder')) {
        ipcRenderer.send('create-folder', $(currentSelected).data('id'));
      } else {
        ipcRenderer.send('create-folder', null);
      }

      $('#add-dropdown').removeClass('show');
    });

    $('.editor-items').on('click', '.item', function() {
      $(this).parent().each(() => { $('.item').removeClass('selected'); });

      if ($(this).hasClass('selected')) { $(this).removeClass('selected'); }
      else { $(this).addClass('selected'); currentSelected = $(this); }
    });

    this.listen();
  }

  listen() {
    ipcRenderer.on('toggle-theme', () => {
      ipcRenderer.send('current-theme', theme.toggleTheme());
    });

    ipcRenderer.on('detect-theme', () => {
      let currentTheme = theme.detectTheme();
      theme.chooseTheme(currentTheme);
      ipcRenderer.send('current-theme', currentTheme);
    });

    ipcRenderer.on('update-project', (error, data) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('item-list'));
      ReactDOM.render(<ItemComponent items={ data } />, document.getElementById('item-list'));
    });
  }
}

module.exports = { EditorController }
