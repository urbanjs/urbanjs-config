# urbanjs-config
[![Build Status](https://travis-ci.org/urbanjs/urbanjs-config.svg?branch=master)](https://travis-ci.org/urbanjs/urbanjs-config)

## Install

```
yarn add urbanjs-config
```

## Usage

For advanced use cases see [examples](https://github.com/urbanjs/urbanjs-config/tree/master/examples)

Example `config.js` file:

```javascript
'use strict';

const es6TemplateResolver = require('es6-template-strings');
const config = require('urbanjs-config');

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
```

## Motivation

`urbanjs-config` does not want to implement all features of configuration management.
This package tries to add the bare minimum utility functions to set up the configuration of applications with ease.
Combine this package with [dotenv](https://www.npmjs.com/package/dotenv) and you're good to go.

Other features (if necessary):
- *custom config storage* - config should be a plain object literal
and [json pointer](https://www.npmjs.com/package/jsonpointer) or [lodash](https://www.npmjs.com/package/lodash)
can be used to retrieve data
- *complex coercing* - config should be a plain object literal with `number`, `string` and `boolean` values
- *validation* - use `json schema` for this purpose, see [example](https://github.com/urbanjs/urbanjs-config/blob/master/examples/05-validation.ts)
- *support of command line arguments* - use environment variables based on [the twelve-factor app methodology](https://12factor.net/config)
- *support of config files* - use environment variables based on [the twelve-factor app methodology](https://12factor.net/config)
- *event listeners* - why would config change at runtime?

## API

## .applyEnvironmentVariables(config, [prefix], [store])

Updates the given `config` with the environment variables.
If prefix is given, environment variables must start with `<PREFIX>__`.

Defaults:
  - prefix: empty string
  - store: `process.env`

```typescript
import { applyEnvironmentVariables } from 'urbanjs-config';

type Configuration = {
  port: number;
  serverOrigin: string;
  useSecureCookies: boolean;
};

const defaults: Configuration = {
  port: 3000,
  serverOrigin: 'http://localhost:3000',
  useSecureCookies: false
};

export const config = applyEnvironmentVariables<Configuration>(
  defaults,
  'MY_PREFIX'
);
```

*Note:* the example above will update the configuration
        if either `MY_PREFIX__PORT`, `MY_PREFIX__SERVER_ORIGIN` or `MY_PREFIX__USE_SECURE_COOKIES`
        are defined within `process.env`.

*Note:* Environment variables are always strings but
        they are transformed based on the original type of the config value.
        **Only boolean, string and number values are supported.**

*Note:* Nested objects are also supported.

*Note:* config key is transformed based on the [.toConstantCase()](https://github.com/urbanjs/urbanjs-config/blob/master/src/utils.ts#L1) api

## .resolveReferences(config, resolver)

Resolves `references` within the config value. A `reference` refers to another config value based on its key.

A resolver method can be implemented based on:

`export type Resolver = (value: string, config: object) => string;`

```typescript
import es6TemplateResolver = require('es6-template-strings');
import { resolveReferences } from 'urbanjs-config';

type Configuration = {
  port: number;
  serverOrigin: string;
};

const defaults: Configuration = {
  port: 3000,
  serverOrigin: 'http://localhost:${port}'
};

export const config = resolveReferences(
  defaults,
  es6TemplateResolver
);
```

