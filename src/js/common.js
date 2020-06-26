module.exports = { checkPathExists, createDataDirectory, createDataFile, readProjectFile, readSettingsFile, writeDataFile }

const filesystem = require('fs');

const Project = require('./models/project');

function checkPathExists(path) {
  filesystem.access(path, filesystem.constants.F_OK, (error) => {
    if (error) { console.error(error.message); return false; }
    else { return true; }
  });
}

function createDataDirectory(path) {
  filesystem.mkdir(path, { recursive: true }, (error) => {
    if (error) { console.error(error.message); return false; }
    else { return true; }
  });
}

function createDataFile(path, data) {
  filesystem.writeFile(path, data, 'utf8', (error) => {
    if (error) { console.error(error.message); return false; }
    else { return true; }
  });
}

function readProjectFile(path) {
  const data = filesystem.readFileSync(path, 'utf8');
  if (data !== undefined) { return mapProjectToObject(JSON.parse(data)); }
  else { return undefined; }
}

function readSettingsFile(path) {
  const data = filesystem.readFileSync(path, 'utf8');
  if (data !== undefined) { return mapSettingsToObject(JSON.parse(data)); }
  else { return undefined; }
}

function mapProjectToObject(data) {
  return new Project({
    name: data.projectName,
    author: data.projectAuthor,
    filePath: data.filePath,
    projectPath: data.projectPath,
    hierarchy: data.projectHierarchy
  });
}

function mapSettingsToObject(data) {
  let settings = new Settings();
  // TODO: Add properties as they're created.
  return settings;
}

function writeDataFile(path, data) {
  filesystem.writeFileSync(path, data, 'utf8');
}
