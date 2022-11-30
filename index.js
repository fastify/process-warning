'use strict'

const { format } = require('util')

function build () {
  const codes = new Map()
  const emitted = new Set()

  function create (name, code, message) {
    if (!name) throw new Error('Warning name must not be empty')
    if (!code) throw new Error('Warning code must not be empty')
    if (!message) throw new Error('Warning message must not be empty')

    code = code.toUpperCase()

    if (codes.has(code) || emitted.has(code)) {
      throw new Error(`The code '${code}' already exist`)
    }

    function buildWarnOpts (a, b, c) {
      // more performant than spread (...) operator
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

      return {
        code,
        name,
        message: formatted
      }
    }

    codes.set(code, buildWarnOpts)

    return buildWarnOpts
  }

  function emit (code, a, b, c) {
    if (emitted.has(code)) {
      return
    }
    if (codes.has(code) === false) {
      throw new Error(`The code '${code}' does not exist`)
    }
    emitted.add(code)

    const warning = codes.get(code)(a, b, c)
    process.emitWarning(warning.message, warning.name, warning.code)
    codes.delete(code)
  }

  return {
    create,
    emit,
    emitted
  }
}

module.exports = build
