const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');

const dir = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  assets: path.resolve('assets'),
};

const base = {
  context: dir.src,
  entry: 'index.js',
  output: {
    path: dir.dist,
    filename: '[name].js',
  },
  resolve: {
    modules: [dir.src, 'node_modules'],
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
};

const dev = {
  devtool: 'eval-source-map',
  plugins: [
    new Html({ template: path.join(dir.assets, 'index.html') }),
  ],
};

const prod = {
  devtool: 'source-map',
  plugins: [
    new Clean(path.join(dir.dist, '**', '*'), { root: dir.dist }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { drop_console: true },
      mangle: {
        except: ['webpackJsonp'],
        screw_ie8: true,
      },
    }),
  ],
};

const environment = { dev, prod };

module.exports = env => merge(base, environment[env]);
