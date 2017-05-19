const webpack = require('webpack');
const dir = require('../../dir');

const publicPath = '/';

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'index.jsx',
  ],
  output: {
    filename: '[name].js',
    path: dir.dist,
    publicPath,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({ multistep: true }),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    hot: true,
    contentBase: dir.dist,
    historyApiFallback: true,
    stats: 'minimal',
    publicPath,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};
