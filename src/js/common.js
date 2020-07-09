module.exports = {
  checkPathExists, createDataDirectory, createDataFile,
  loadDataFile, readProjectFile, readSettingsFile,
  addItemToHierarchy, getItemFromProjectHierarchy,
  removeItemFromProjectHierarchy
}

const filesystem = require('fs');

const Project = require('./main/models/project');
const Settings = require('./main/models/settings');
const File = require('./main/models/document');
const Folder = require('./main/models/folder');
const Content = require('./main/models/content');

const config = require('./config');

function checkPathExists(path) {
  try { filesystem.accessSync(path, filesystem.constants.F_OK); return true; }
  catch (error) { return false; }
}

function createDataDirectory(path) {
  try { filesystem.mkdirSync(path, { recursive: true }); return true; }
  catch (error) { return false; }
}

function createDataFile(path, data) {
  try { filesystem.writeFileSync(path, data, { encoding: 'utf8' }); return true; }
  catch (error) { return false; }
}

function loadDataFile(item, path) {
  try {
    const data = filesystem.readFileSync(path, 'utf8');
    if (data !== undefined) { return mapFileToContent(item, data); }
    else { return undefined; }
  } catch (error) { return undefined; }
}

function readProjectFile(path) {
  try {
    const data = filesystem.readFileSync(path, 'utf8');
    if (data !== undefined) { return mapProjectToObject(JSON.parse(data)); }
    else { return undefined; }
  } catch (error) { return undefined; }
}

function readSettingsFile(path) {
  try {
    const data = filesystem.readFileSync(path, 'utf8');
    if (data !== undefined) { return mapSettingsToObject(JSON.parse(data)); }
    else { return undefined; }
  } catch (error) { return undefined; }
}

function mapFileToContent(item, data) {
  return new Content({
    id: item.ID,
    name: item.Name,
    content: data
  });
}

function mapProjectToObject(data) {
  let project = new Project({
    name: data._projectName,
    author: data._projectAuthor,
    filePath: data._projectFilePath,
    projectPath: data._projectPath,
    documentPath: data._documentPath
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

function addItemToHierarchy(hierarchy, item, value) {
  for (let i = 0; i < hierarchy.length; i++) {
    if (hierarchy[i].Hierarchy && hierarchy[i].Hierarchy.length !== 0) {
      addItemToHierarchy(hierarchy[i].Hierarchy, item, value); // Recurse
    }

    if (hierarchy[i].ID === value) {
      hierarchy[i].Hierarchy.push(item);
    }
  }
}

function removeItemFromProjectHierarchy(id) {
  let project = config.getCurrentProject();

  searchHierarchy(project.Hierarchy, id);

  function searchHierarchy(hierarchy, id) {
    for (let i = 0; i < hierarchy.length; i++) {
      if (hierarchy[i].Hierarchy && hierarchy[i].Hierarchy.length !== 0) {
        searchHierarchy(hierarchy[i].Hierarchy, id); // Recurse
      }

      if (hierarchy[i].ID === id) {
        hierarchy.splice(i, 1);
      }
    }
  }
}

function getItemFromProjectHierarchy(id) {
  let project = config.getCurrentProject();
  let item = null;

  searchHierarchy(project.Hierarchy, id);

  function searchHierarchy(hierarchy, id) {
    for (let i = 0; i < hierarchy.length; i++) {
      if (hierarchy[i].Hierarchy && hierarchy[i].Hierarchy.length !== 0) {
        searchHierarchy(hierarchy[i].Hierarchy, id); // Recurse
      }

      if (hierarchy[i].ID === id) {
        item = hierarchy[i];
      }
    }
  }

  return item;
}
