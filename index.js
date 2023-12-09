'use strict'

const { format } = require('node:util')

function createDeprecation (code, message, opts = {}) {
  return createWarning('DeprecationWarning', code, message, opts)
}

function createWarning (name, code, message, { unlimited = false } = {}) {
  if (!name) throw new Error('Warning name must not be empty')
  if (!code) throw new Error('Warning code must not be empty')
  if (!message) throw new Error('Warning message must not be empty')
  if (typeof unlimited !== 'boolean') throw new Error('Warning opts.unlimited must be a boolean')

  code = code.toUpperCase()

  return new WarningItem(name, code, message, unlimited)
}

class WarningItem {
  constructor (name, code, message, unlimited) {
    this.name = name
    this.code = code
    this.message = message
    this.unlimited = unlimited
    this.emitted = false
  }

  emit (a, b, c) {
    if (this.emitted === true && this.unlimited === false) {
      return
    }
    this.emitted = true

    process.emitWarning(this.format(a, b, c), this.name, this.code)
  }

  format (a, b, c) {
    let formatted
    if (a && b && c) {
      formatted = format(this.message, a, b, c)
    } else if (a && b) {
      formatted = format(this.message, a, b)
    } else if (a) {
      formatted = format(this.message, a)
    } else {
      formatted = this.message
    }
    return formatted
  }

  isEmitted () {
    return this.emitted
  }

  setEmitted (value) {
    this.emitted = value === true
  }
}

const out = { createWarning, createDeprecation }
module.exports = out
module.exports.default = out
module.exports.processWarning = out
