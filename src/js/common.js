module.exports = { checkDirectoryExists, createDataDirectory, writeDataFile }

const fs = require('fs');

function checkDirectoryExists(path) {
  let check = false;
  if (fs.existsSync(path)) { check = true; }
  return check;
}

function createDataDirectory(path) {
  let success = false;
  success = fs.mkdirSync(path);
  return success;
}

function writeDataFile(path, data) {
  let success = false;
  fs.writeFile(path, data, 'utf8', (error) => {
    if (error) { console.error(error); }
    else { success = true; }
  });
  return success;
}
