'use strict'

const { test } = require('tap')
const { createWarning } = require('..')

test('Must not overwrite config', t => {
  t.plan(1)

  function onWarning (warning) {
    t.equal(warning.code, 'CODE_1')
  }

  const a = createWarning('FastifyWarning', 'CODE_1', 'Msg', { unlimited: false })
  createWarning('FastifyWarning', 'CODE_2', 'Msg', { unlimited: true })

  process.on('warning', onWarning)
  a('CODE_1')
  a('CODE_1')

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
