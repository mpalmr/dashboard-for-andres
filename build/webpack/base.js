const webpack = require('webpack');
const dir = require('../dir');
const pkg = require('../../package');

module.exports = env => ({
  context: dir.src,
  entry: 'index.js',
  resolve: {
    modules: [dir.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: env,
      VERSION: pkg.version,
      SUPPORTED_BROWSERS: pkg.browserslist,
    }),
  ],
});
