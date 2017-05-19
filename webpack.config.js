const path = require('path');
const Clean = require('clean-webpack-plugin');

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
  resolve: {
    modules: [
      dir.src,
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
      },
    ],
  },
  plugins: [
    new Clean(path.resolve(dir.dist, '**', '*'), { root: dir.dist }),
  ],
};
