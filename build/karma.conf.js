const webpackConfig = require('./webpack');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['../src/*_spec.js'],
    preprocessors: { '../src/*_spec.js': ['webpack'] },
    browsers: ['Chrome'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: { stats: 'errors-only' },
  });
};
