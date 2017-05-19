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
      ENV: JSON.stringify(env),
      VERSION: JSON.stringify(pkg.version),
      SUPPORTED_BROWSERS: JSON.stringify(pkg.browserslist),
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
  ],
});
