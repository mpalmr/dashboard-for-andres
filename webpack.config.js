const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');
const ScriptExtHtml = require('script-ext-html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const Favicons = require('favicons-webpack-plugin');
const pkg = require('./package');

const dir = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  assets: path.resolve('assets'),
};

const styleBundle = new ExtractText('[name].css');


const base = env => ({
  context: dir.src,
  entry: 'index.js',
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
        use: styleBundle.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    styleBundle,
    new webpack.DefinePlugin({
      ENV: env,
      VERSION: pkg.version,
      SUPPORTED_BROWSERS: pkg.browserslist,
    }),
    new Html({
      template: path.join(dir.assets, 'index.html'),
      inject: 'head',
      minify: env === 'prod' ? {} : false,
      hash: env === 'prod',
      cache: env !== 'prod',
    }),
    new ScriptExtHtml({ defaultAttribute: 'defer' }),
    new Favicons({
      logo: path.join(dir.assets, 'favicon.jpg'),
      prefix: 'favicons-[hash]/',
      title: 'Crowdcare Dashboard',
    }),
  ],
});


const dev = () => ({
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
});


const prod = () => ({
  output: {
    path: dir.dist,
    filename: '[name].js',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        drop_console: true,
        screw_ie8: true,
      },
      mangle: {
        except: ['webpackJsonp'],
        keep_fnames: true,
      },
    }),
    new Clean(path.join(dir.dist, '**', '*'), { root: dir.dist }),
  ],
  devtool: 'source-map',
});


const environment = { dev, prod };

module.exports = env => merge(base(env), environment[env](env));
