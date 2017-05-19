const path = require('path');

const dir = {
  root: path.resolve('.'),
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  build: path.resolve('build'),
};

dir.buildAssets = path.join(dir.build, 'assets');

module.exports = dir;
