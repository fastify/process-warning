# process-warning

![CI](https://github.com/fastify/process-warning/workflows/CI/badge.svg)
[![NPM version](https://img.shields.io/npm/v/process-warning.svg?style=flat)](https://www.npmjs.com/package/process-warning)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

A small utility for generating consistent warning objects across your codebase.
It also exposes a utility for emitting those warnings, guaranteeing that they are issued only once (unless configured otherwise).

This module is used by the [Fastify](https://fastify.io) framework and it was called `fastify-warning` prior to version 1.0.0.

### Install

```
npm i process-warning
```

### Usage

The module exports a 2 builder functions for creating warnings and emitting them.

```js
const {
  createWarning,
  createDeprecation
} = require('process-warning')

const warning = createWarning('FastifyWarning', 'FSTWRN001', 'Hello %s', { unlimited: true })
warning.emit('world')
```

#### Methods

##### `createWarning(name, code, message[, options])`

- `name` (`string`, required) - The error name, you can access it later with
`error.name`. For consistency, we recommend prefixing module error names
with `{YourModule}Warning`
- `code` (`string`, required) - The warning code, you can access it later with
`error.code`. For consistency, we recommend prefixing plugin error codes with
`{ThreeLetterModuleName}_`, e.g. `FST_`. NOTE: codes should be all uppercase.
- `message` (`string`, required) - The warning message. You can also use
interpolated strings for formatting the message.
- `options` (`object`, optional) - Optional options with the following
properties:
  + `unlimited` (`boolean`, optional) - Should the warning be emitted more than
  once? Defaults to `false`.


##### `createDeprecation(code, message[, options])`

This is a wrapper for `warning.create`. It is equivalent to invoking
`warning.create` with the `name` parameter set to "DeprecationWarning".

Deprecation warnings have extended support for the Node.js CLI options:
`--throw-deprecation`, `--no-deprecation`, and `--trace-deprecation`.

##### `warning.emit([, a [, b [, c]]])`

The utility also contains an `emit` function that you can use for emitting the
warnings you have previously created by passing their respective code.
A warning is guaranteed to be emitted at least once.

- `[, a [, b [, c]]]` (`any`, optional) - Parameters for string interpolation.

```js
const { createWarning } = require('process-warning')
const FST_ERROR_CODE = createWarning('FastifyWarning', 'FST_ERROR_CODE', 'message')
FST_ERROR_CODE.emit()
```

How to use an interpolated string:
```js
const { createWarning } = require('process-warning')
const FST_ERROR_CODE = createWarning('FastifyWarning', 'FST_ERROR_CODE', 'Hello %s')
FST_ERROR_CODE.emit('world')
```

The `warning` object has few utilities, which contains the warning's state. Useful for testing.
```js
const { createWarning } = require('process-warning')
const FST_ERROR_CODE = createWarning('FastifyWarning', 'FST_ERROR_CODE', 'Hello %s')
console.log(FST_ERROR_CODE.isEmitted()) // false
FST_ERROR_CODE.emit('world')
console.log(FST_ERROR_CODE.isEmitted()) // true
```

How to use an unlimited warning:
```js
const { createWarning } = require('process-warning')
const FST_ERROR_CODE = createWarning('FastifyWarning', 'FST_ERROR_CODE', 'Hello %s', { unlimited: true })
FST_ERROR_CODE.emit('world') // will be emitted
FST_ERROR_CODE.emit('world') // will be emitted again
```

#### Suppressing warnings

It is possible to suppress warnings by utilizing one of node's built-in warning suppression mechanisms.

Warnings can be suppressed:

- by setting the `NODE_NO_WARNINGS` environment variable to `1`
- by passing the `--no-warnings` flag to the node process
- by setting 'no-warnings' in the `NODE_OPTIONS` environment variable

For more information see [node's documentation](https://nodejs.org/api/cli.html).

## License

Licensed under [MIT](./LICENSE).
