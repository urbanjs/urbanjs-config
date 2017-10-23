'use strict';

const gulp = require('gulp');
const tools = require('urbanjs-tools');

tools.setGlobalConfiguration({
  babel: false
});

tools.initialize(gulp, {
  babel: {
    emitOnError: false
  },

  'check-dependencies': true,

  'check-file-names': true,

  'conventional-changelog': true,

  mocha: {
    collectCoverage: false
  },

  nsp: true,

  retire: true,

  tslint: {
    configFile: './tslint.json'
  }
});

gulp.task('default', ['test:watch']);
