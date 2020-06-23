module.exports = { checkPathExists, createDataDirectory, createDataFile }

const filesystem = require('fs');

function checkPathExists(path) {
  let check = false;
  filesystem.access(path, filesystem.constants.F_OK, (error) => {
    if (error) { console.error(error.message); }
    else { check = true; }
  });
  return check;
}

function createDataDirectory(path) {
  let success = false;
  filesystem.mkdir(path, { recursive: true }, (error) => {
    if (error) { console.error(error.message); }
    else { success = true; }
  });
  return success;
}

function createDataFile(path, data) {
  let success = false;
  filesystem.writeFile(path, data, 'utf8', (error) => {
    if (error) { console.error(error.message); }
    else { success = true; }
  });
  return success;
}
