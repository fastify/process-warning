'use strict'

const test = require('tap').test
const { createWarning } = require('..')

test('emit should emit a given code only once', t => {
  t.plan(4)

  process.on('warning', onWarning)
  function onWarning (warning) {
    t.equal(warning.name, 'FastifyDeprecation')
    t.equal(warning.code, 'CODE')
    t.equal(warning.message, 'Hello world')
    t.ok(warn.emitted)
  }

  const warn = createWarning('FastifyDeprecation', 'CODE', 'Hello world')
  warn()
  warn()
  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
