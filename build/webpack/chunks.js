const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: chunk => chunk.context && chunk.context.indexOf('node_modules') !== 1,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  ],
};
