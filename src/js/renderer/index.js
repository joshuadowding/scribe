module.exports = { init }

const { EditorWindow } = require('../main/windows/editor-window');

function init() {
  new EditorWindow(); // Create the main 'editor' window.
}
