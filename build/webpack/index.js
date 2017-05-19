const merge = require('webpack-merge');
const base = require('./base');
const assets = require('./assets');
const page = require('./page');
const environment = require('./environment');

module.exports = env => merge(
  base(env),
  assets.scripts,
  assets.styles(),
  page(env),
  environment[env]);
