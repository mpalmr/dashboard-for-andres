const path = require('path');
const Html = require('html-webpack-plugin');
const ScriptExtHtml = require('script-ext-html-webpack-plugin');
const Favicons = require('favicons-webpack-plugin');
const dir = require('../dir');

module.exports = env => ({
  plugins: [
    new Html({
      template: path.join(dir.buildAssets, 'index.html'),
      inject: 'head',
      minify: env === 'prod' ? {} : false,
      hash: env === 'prod',
    }),
    new ScriptExtHtml({ defaultAttribute: 'defer' }),
    new Favicons({
      logo: path.join(dir.buildAssets, 'favicon.jpg'),
      prefix: 'favicons-[hash]/',
      title: 'Crowdcare Dashboard',
    }),
  ],
});
