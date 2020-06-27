# fastify-deprecation

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  ![build](https://github.com/fastify/fastify-deprecation/workflows/build/badge.svg)

A small utility, used by Fastify itself, for generating consistent warning objects across your codebase and plugins.
It also exposes a utility for emitting those warnings, guaranteeing that they are issued only once.

### Install
```
npm i fastify-deprecation
```

### Usage

The module exports a function named `createWarning` that you can use consistent warning objects, it takes 3 parameters.

```
createWarning(name, code, message)
```

- `name` (`string`, required) - The error name, you can access it later with `error.name`. For consistency, we recommend to prefix the plugins error names with `FastifyDeprecation{YourPluginName}`
- `code` (`string`, required) - The warning code, you can access it later with `error.code`. For consistency, we recommend to prefix the plugins error codes with `FST_{YourPluginName}_`
- `message` (`string`, required) - The warning message. You can also use interpolated strings for formatting the message.

It also exports a function named `emitWarning`, that you can use for emitting the warnings you have previously created, by passing their respective code. A warning is guaranteed to be emitted only once.

```
emitWarning(code [, a [, b [, c]]])
```

- `code` (`string`, required) - The warning code you intend to emit.
- `[, a [, b [, c]]]` (`any`, optional) - Parameters for string interpolation.

```js
const { createWarning, emitWarning } = require('fastify-deprecation')
createWarning('FastifyDeprecation', 'FST_ERROR_CODE', 'message')
emitWarning('FST_ERROR_CODE')
```

How to use a interpolated string:
```js
const { createWarning, emitWarning } = require('fastify-deprecation')
createWarning('FastifyDeprecation', 'FST_ERROR_CODE', 'Hello %s')
emitWarning('FST_ERROR_CODE', 'world')
```

## License

Licensed under [MIT](./LICENSE).
