'use strict'

const test = require('tap').test
const { createWarning } = require('..')

test('emit should emit a given code unlimited times', t => {
  t.plan(50)

  let runs = 0
  const expectedRun = []
  const times = 10

  process.on('warning', onWarning)
  function onWarning (warning) {
    t.equal(warning.name, 'FastifyDeprecation')
    t.equal(warning.code, 'CODE')
    t.equal(warning.message, 'Hello world')
    t.ok(warn.isEmitted())
    t.equal(runs++, expectedRun.shift())
  }

  const warn = createWarning('FastifyDeprecation', 'CODE', 'Hello world', { unlimited: true })

  for (let i = 0; i < times; i++) {
    expectedRun.push(i)
    warn.emit()
  }
  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
