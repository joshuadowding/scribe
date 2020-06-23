module.exports = { init }

const Settings = require('../main/models/settings');
const common = require('../common');
const config = require('../config');

const path = require('path');

const homedir = require('os').homedir();
const datadir = path.join(homedir, ".scribe");
const confdir = path.join(datadir, "settings.json");

function init() {
  let settings = new Settings();

  let data = JSON.stringify(settings);

  // Check if the data directory exists, if not, create an empty directory:
  let check = common.checkPathExists(datadir);
  if (!check) { common.createDataDirectory(datadir); }
  check = false; // Reset check for second check.

  // Check if the configuration file exists; if not, create an empty (placeholder) file:
  check = common.checkPathExists(confdir);
  if (!check) { common.createDataFile(confdir, data); }

  config.setCurrentSettings(settings);
}
