/// <reference path="../types/es6-template-strings.d.ts" />

import * as Ajv from 'ajv';
import es6TemplateResolver = require('es6-template-strings');
import { resolveReferences, applyEnvironmentVariables } from '../dist'; // from 'urbanjs-config'

type Configuration = {
  port: number;
  serverOrigin: string;
  useSecureCookies: boolean;
};

const defaults: Configuration = {
  port: 3000,
  serverOrigin: 'http://localhost:${port}', // tslint:disable-line no-invalid-template-strings
  useSecureCookies: false
};

export const config =
  resolveReferences<Configuration>(
    applyEnvironmentVariables<Configuration>(defaults, 'MY_APP'),
    es6TemplateResolver
  );

// use a simple json schema validator
// for this purpose if required
const schema = {
  type: 'object',
  required: ['port', 'serverOrigin', 'useSecureCookies'],
  properties: {
    port: {
      type: 'number',
      minimum: 3000
    },
    serverOrigin: {
      type: 'string'
    },
    useSecureCookies: {
      type: 'boolean'
    }
  }
};

const ajv = new Ajv({allErrors: true});
if (!ajv.validate(schema, config)) {
  throw new Error(`Invalid configuration: ${ajv.errors[0].dataPath} ${ajv.errors[0].message}`);
}
