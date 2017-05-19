const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const dir = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  assets: path.resolve('assets'),
};

const styleBundle = new ExtractText('[name].css');


const base = () => ({
  context: dir.src,
  entry: 'index.js',
  output: {
    path: dir.dist,
    filename: '[name].js',
  },
  resolve: {
    modules: [dir.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
      },
      {
        test: /\.scss$/,
        use: styleBundle.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
      },
    ],
  },
  plugins: [
    styleBundle,
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer(pkg.browserslist)],
      },
    }),
  ],
});


const dev = () => ({
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin({ multistep: true }),
    new Html({ template: path.join(dir.assets, 'index.html') }),
  ],
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
});


const prod = () => ({
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
});


const environment = { dev, prod };

module.exports = env => merge(base, environment[env](env));
