const path = require('path');

const dir = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
};

module.exports = {
  entry: path.resolve(dir.src, 'index.js'),
  output: {
    path: dir.dist,
    filename: '[name].js',
  },
};
