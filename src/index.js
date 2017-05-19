require('babel-polyfill');
require('./base.scss');
const ey = require('./ey');

console.log(ey());
console.log(ENV);
console.log(VERSION);
console.log(SUPPORTED_BROWSERS);
