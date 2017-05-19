const webpack = require('webpack');
const Manifest = require('webpack-manifest-plugin');
const dir = require('../dir');
const pkg = require('../../package');

module.exports = env => ({
  context: dir.src,
  resolve: {
    modules: [dir.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env),
      VERSION: JSON.stringify(pkg.version),
      SUPPORTED_BROWSERS: JSON.stringify(pkg.browserslist),
    }),
    new Manifest({ basePath: dir.dist }),
  ],
});
