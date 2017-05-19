const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const dir = require('../dir');

const dev = {
  plugins: [new webpack.HotModuleReplacementPlugin({ multistep: true })],
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    stats: 'minimal',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};

const prod = {
  entry: { main: 'index.js' },
  output: {
    filename: '[name].[chunkhash].js',
    path: dir.dist,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
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
    new Clean(path.join(dir.dist, '**', '*'), { root: dir.dist }),
  ],
  devtool: 'source-map',
};

module.exports = { dev, prod };
