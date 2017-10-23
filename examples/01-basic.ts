/// <reference path="../types/es6-template-strings.d.ts" />

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
