module.exports = { init }

const menu = require('./menu');
const common = require('./common');

const path = require('path');

const homedir = require('os').homedir();
const datadir = path.join(homedir, ".scribe");
const confdir = path.join(datadir, "settings.json");

function init() {
  menu.init();
  
  // Check if the data directory exists, if not, create an empty directory:
  let check = common.checkDirectoryExists(datadir);
  if (!check) { common.createDataDirectory(datadir); }

  // Check if the configuration file exists; if not, create an empty (placeholder) file:
  check = common.checkDirectoryExists(confdir);
  if (!check) { common.createSettingsFile(confdir); }
}
