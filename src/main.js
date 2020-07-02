const path = require('path');

const root = path.join(__dirname, '..');
require('electron-compile').init(root, require.resolve('./js/index'));
