module.exports = { init, getWindow, addWindow, removeWindow }

let windows;

function init() {
  windows = new Map();
}

function getWindow(name) {
  if (windows.has(name)) {
    return windows.get(name);
  }
}

function addWindow(name, window) {
  windows.set(name, window);
}

function removeWindow(name) {
  if (windows.has(name)) {
    windows.delete(name);
  }
}
