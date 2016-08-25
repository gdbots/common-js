'use strict';

// disable babel cache.
process.env.BABEL_DISABLE_CACHE = 1;

require('babel-register')({
  plugins: [
    ['module-alias', [
      { src: './src', expose: 'gdbots/common' }
    ]]
  ]
});

require('chai').should();
global.expect = require('chai');
