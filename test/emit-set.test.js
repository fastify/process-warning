'use strict'

const test = require('tap').test
const { createWarning } = require('../')

test('emit should set the emitted state', t => {
  t.plan(3)

  process.on('warning', onWarning)
  function onWarning () {
    t.fail('should not be called')
  }

  const warn = createWarning('FastifyDeprecation', 'CODE', 'Hello world')
  t.notOk(warn.emitted)
  warn.emitted = true
  t.ok(warn.emitted)

  warn.emit()
  t.ok(warn.emitted)

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
