module.exports = { checkPathExists, createDataDirectory, createDataFile, readProjectFile, readSettingsFile }

const Project = require('./models/project');

const filesystem = require('fs');

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
  let project = new Project();
  project.setName(data.projectName);
  project.setAuthor(data.projectAuthor);
  project.setPath(data.projectPath);
  project.setHierarchy(data.projectHierarchy);
  return project;
}

function mapSettingsToObject(data) {
  let settings = new Settings();
  // TODO: Add properties as they're created.
  return settings;
}
