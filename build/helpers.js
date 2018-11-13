const path = require('path');

// Helper functions
const ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
    return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

const root = path.join.bind(path, ROOT);

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
