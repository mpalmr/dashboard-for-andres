const merge = require('webpack-merge');
const base = require('./base');
const assets = require('./assets');
const page = require('./page');
const environments = require('./environments');
const chunks = require('./chunks');

module.exports = (env = 'dev') => merge(
  base(env),
  assets.scripts,
  assets.styles(),
  page(env),
  environments[env],
  chunks);
