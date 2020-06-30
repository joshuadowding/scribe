module.exports = { checkPathExists, createDataDirectory, createDataFile, readProjectFile, readSettingsFile, writeDataFile }

const filesystem = require('fs');

const Project = require('./models/project');
const Settings = require('./models/settings');
const File = require('./models/document');
const Folder = require('./models/folder');

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
  let project = new Project({
    name: data._projectName,
    author: data._projectAuthor,
    filePath: data._projectFilePath,
    projectPath: data._projectPath
  });

  for (let i = 0; i < data._projectHierarchy.length; i++) {
    if (data._projectHierarchy[i]._objectType === 'File') {
      project.Hierarchy.push(new File({
        id: data._projectHierarchy[i]._objectID,
        type: data._projectHierarchy[i]._objectType,
        name: data._projectHierarchy[i]._documentName,
        path: data._projectHierarchy[i]._documentPath
      }));
    } else if (data._projectHierarchy[i]._objectType === 'Folder') { // TODO: Make recursive.
      project.Hierarchy.push(new Folder({
        id: data._projectHierarchy[i]._objectID,
        type: data._projectHierarchy[i]._objectType,
        name: data._projectHierarchy[i]._folderName,
        path: data._projectHierarchy[i]._folderPath
      }));
    }
  }

  return project;
}

function mapSettingsToObject(data) {
  return new Settings({
    // TODO: Add properties as they're created.
  });
}

function writeDataFile(path, data) {
  filesystem.writeFileSync(path, data, 'utf8');
}
