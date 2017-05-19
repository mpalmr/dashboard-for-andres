module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    browser: true,
    es6: true,
    worker: true,
  },
  globals: {
    ENV: true,
    VERSION: true,
    SUPPORTED_BROWSERS: true,
  },
};
