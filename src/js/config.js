module.exports = {
  init,
  getWindow, addWindow, removeWindow,
  getCurrentTheme, setCurrentTheme,
  getDetectTheme, setDetectTheme,
  getCurrentProject, setCurrentProject
}

let currentWindows;
let currentTheme;
let currentProject;
let detectTheme;

function init() {
  currentWindows = new Map();
}

function getWindow(name) {
  if (currentWindows.has(name)) {
    return currentWindows.get(name);
  }
}

function addWindow(name, window) {
  currentWindows.set(name, window);
}

function removeWindow(name) {
  if (currentWindows.has(name)) {
    currentWindows.delete(name);
  }
}

function setCurrentTheme(name) {
  if (name === 'Dark' || name === 'Light') {
    currentTheme = name;
  }
}

function getCurrentTheme() {
  return currentTheme;
}

function setDetectTheme(boolean) {
  detectTheme = boolean;
}

function getDetectTheme() {
  return detectTheme;
}

function getCurrentProject() {
  return currentProject;
}

function setCurrentProject(project) {
  currentProject = project;
}
