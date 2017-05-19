const ExtractText = require('extract-text-webpack-plugin');

const scripts = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
    }],
  },
};

const styles = (bundle = new ExtractText('[name].css')) => ({
  module: {
    rules: [{
      test: /\.scss$/,
      use: bundle.extract({
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
    }],
  },
  plugins: [bundle],
});

module.exports = { scripts, styles };
