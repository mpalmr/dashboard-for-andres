const path = require('path');

const dir = {
  root: path.resolve('.'),
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  build: path.resolve('build'),
};

dir.assets = path.join(dir.src, 'assets');

module.exports = dir;
