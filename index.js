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

  return buildWarningItem(name, code, message, unlimited)
}

function buildWarningItem (name, code, message, unlimited) {
  const item = Object.create(null, {
    code: { value: code, writable: false },
    name: { value: name, writable: false },
    message: { value: message, writable: false },
    emitted: { value: false, writable: true },
    emit: { value: emit, writable: false },
    format: { value: formatString.bind(null, message), writable: false }
  })

  return item

  function emit (a, b, c) {
    if (item.emitted === true && unlimited === false) {
      return
    }
    item.emitted = true

    process.emitWarning(formatString(message, a, b, c), name, code)
  }
}

function formatString (message, a, b, c) {
  let formatted
  if (a && b && c) {
    formatted = format(message, a, b, c)
  } else if (a && b) {
    formatted = format(message, a, b)
  } else if (a) {
    formatted = format(message, a)
  } else {
    formatted = message
  }
  return formatted
}

const out = { createWarning, createDeprecation }
module.exports = out
module.exports.default = out
module.exports.processWarning = out
