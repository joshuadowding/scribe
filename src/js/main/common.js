module.exports = { checkDirectoryExists, createDataDirectory }

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
