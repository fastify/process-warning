'use strict'

const test = require('tap').test
const { createWarning } = require('../')

test('a limited warning can be re-set', t => {
  t.plan(4)

  let count = 0
  process.on('warning', onWarning)
  function onWarning () {
    count++
  }

  const warn = createWarning({
    name: 'TestDeprecation',
    code: 'CODE',
    message: 'Hello world'
  })

  warn.emit()
  t.ok(warn.emitted)

  warn.emit()
  t.ok(warn.emitted)

  warn.emitted = false
  warn.emit()
  t.ok(warn.emitted)

  setImmediate(() => {
    t.equal(count, 2)
    process.removeListener('warning', onWarning)
    t.end()
  })
})
