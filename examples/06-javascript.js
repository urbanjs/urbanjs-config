'use strict';

const es6TemplateResolver = require('es6-template-strings');
const config = require('../dist'); // urbanjs-config

const defaults = {
  port: 3000,
  serverOrigin: 'http://localhost:${port}',
  useSecureCookies: false
};

module.exports =
  config.resolveReferences(
    config.applyEnvironmentVariables(defaults, 'MY_APP'),
    es6TemplateResolver
  );
