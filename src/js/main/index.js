module.exports = { init }

const Settings = require('./models/settings');
const common = require('../common');
const config = require('../config');

function init() {
  let settings = new Settings();

  // Check if the data directory exists, if not, create an empty directory:
  let check = common.checkPathExists(config.getDataDir());
  if (!check) { common.createDataDirectory(config.getDataDir()); }
  check = false; // Reset check for second check.

  // Check if the configuration file exists; if not, create an empty (placeholder) file:
  check = common.checkPathExists(config.getConfDir());
  if (!check) { common.createDataFile(config.getConfDir(), JSON.stringify(settings)); }
  else {
    const data = common.readSettingsFile(config.getConfDir());
    if (data !== undefined) { config.setCurrentSettings(data); }
    else {
      // TODO: Handle invalid settings file.
    }
  }

  config.setCurrentSettings(settings);
}
