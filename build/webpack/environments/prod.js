const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const dir = require('../../dir');

module.exports = {
  entry: { main: 'index.js' },
  output: {
    filename: '[name].[chunkhash].js',
    path: dir.dist,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        except: ['webpackJsonp'],
        keep_fnames: true,
        screw_ie8: true,
      },
      compress: {
        drop_console: true,
        screw_ie8: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new Clean(dir.dist, { root: dir.root }),
  ],
  devtool: 'source-map',
};
