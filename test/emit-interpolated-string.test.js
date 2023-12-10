'use strict'

const test = require('tap').test
const { createWarning } = require('..')

test('emit with interpolated string', t => {
  t.plan(4)

  process.on('warning', onWarning)
  function onWarning (warning) {
    t.equal(warning.name, 'FastifyDeprecation')
    t.equal(warning.code, 'CODE')
    t.equal(warning.message, 'Hello world')
    t.ok(codeWarning.emitted)
  }

  const codeWarning = createWarning('FastifyDeprecation', 'CODE', 'Hello %s')
  codeWarning('world')
  codeWarning('world')

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
