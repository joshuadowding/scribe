module.exports = {
  init,
  getWindow, addWindow, removeWindow,
  getCurrentTheme, setCurrentTheme,
  getDetectTheme, setDetectTheme,
  getCurrentProject, setCurrentProject,
  getCurrentSettings, setCurrentSettings,
  getHomeDir, getDataDir, getConfDir,
  getFirstRun, setFirstRun
}

const path = require('path');

let currentWindows;
let currentTheme;
let currentProject;
let currentSettings;
let detectTheme;

let firstRun = true;

const homeDir = require('os').homedir();
const dataDir = path.join(homeDir, ".scribe");
const confDir = path.join(dataDir, "settings.json");

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

function getCurrentSettings() {
  return currentSettings;
}

function setCurrentSettings(settings) {
  currentSettings = settings;
}

function getHomeDir() {
  return homeDir;
}

function getDataDir() {
  return dataDir;
}

function getConfDir() {
  return confDir;
}

function getFirstRun() {
  return firstRun;
}

function setFirstRun(value) {
  firstRun = value;
}
