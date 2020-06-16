module.exports = { checkDirectoryExists, createDataDirectory, createSettingsFile }

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

function createSettingsFile(path) {
  let success = false;
  fs.writeFile(path, '{}', 'utf8', (error, data) => {
    if (error) { console.error(error); }
    else { success = true; }
  });
  return success;
}
