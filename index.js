'use strict'

const { inherits, format } = require('util')
const codes = {}
const emittedWarnings = new Map()

function createWarning (name, code, message) {
  if (!name) throw new Error('Fastify warning name must not be empty')
  if (!code) throw new Error('Fastify warning code must not be empty')
  if (!message) throw new Error('Fastify warning message must not be empty')

  code = code.toUpperCase()

  function FastifyWarning (a, b, c) {
    if (!(this instanceof FastifyWarning)) {
      return new FastifyWarning(a, b, c)
    }
    Error.captureStackTrace(this, FastifyWarning)
    this.name = name
    this.code = code

    // more performant than spread (...) operator
    if (a && b && c) {
      this.message = format(message, a, b, c)
    } else if (a && b) {
      this.message = format(message, a, b)
    } else if (a) {
      this.message = format(message, a)
    } else {
      this.message = message
    }
  }
  FastifyWarning.prototype[Symbol.toStringTag] = 'Warning'

  FastifyWarning.prototype.toString = function () {
    return `${this.name} [${this.code}]: ${this.message}`
  }

  inherits(FastifyWarning, Error)

  codes[code] = FastifyWarning

  return codes[code]
}

function emitWarning (code, a, b, c) {
  if (codes[code] === undefined) throw new Error(`The code '${code}' does not exist`)
  if (emittedWarnings.has(code) === true) return
  emittedWarnings.set(code, true)
  process.emitWarning(new codes[code](a, b, c))
}

module.exports = { createWarning, emitWarning }
