module.exports = { init }

const menu = require('./menu');
const common = require('./common');

const path = require('path');
const homedir = require('os').homedir();
const datadir = path.join(homedir, ".scribe");

function init() {
  menu.init();
  
  // Check if data directory exists:
  let check = common.checkDirectoryExists(datadir);
  if (!check) { common.createDataDirectory(datadir); }
  console.log(datadir, check);
}
