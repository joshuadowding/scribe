module.exports = { checkPathExists, createDataDirectory, createDataFile, readProjectFile, readSettingsFile, writeDataFile, getHierarchyIndex }

const filesystem = require('fs');

const Project = require('./main/models/project');
const Settings = require('./main/models/settings');
const File = require('./main/models/document');
const Folder = require('./main/models/folder');

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

  populateHierarchy(data._projectHierarchy, project);
  return project;
}

function populateHierarchy(hierarchy, project) {
  for (let i = 0; i < hierarchy.length; i++) {
    if (hierarchy[i]._objectType === 'Folder') {
      let folder = new Folder({
        id: hierarchy[i]._objectID,
        type: hierarchy[i]._objectType,
        name: hierarchy[i]._folderName,
        path: hierarchy[i]._folderPath
      });

      if (hierarchy[i]._folderHierarchy.length !== 0) {
        populateHierarchy(hierarchy[i]._folderHierarchy, folder); // Recurse
      }

      project.Hierarchy.push(folder);
    } else if (hierarchy[i]._objectType === 'File') {
      project.Hierarchy.push(new File({
        id: hierarchy[i]._objectID,
        type: hierarchy[i]._objectType,
        name: hierarchy[i]._documentName,
        path: hierarchy[i]._documentPath
      }));
    }
  }
}

function mapSettingsToObject(data) {
  return new Settings({
    // TODO: Add properties as they're created.
  });
}

function writeDataFile(path, data) {
  filesystem.writeFileSync(path, data, 'utf8');
}

function getHierarchyIndex(hierarchy, item, value) {
  for (let i = 0; i < hierarchy.length; i++) {
    if (hierarchy[i].Hierarchy && hierarchy[i].Hierarchy.length !== 0) {
      getHierarchyIndex(hierarchy[i].Hierarchy, item, value);
    }

    if (hierarchy[i].ID === value) {
      hierarchy[i].Hierarchy.push(item);
    }
  }
}
