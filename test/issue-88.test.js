'use strict'

const { test } = require('tap')
const build = require('..')

test('Must not overwrite the global config', t => {
  t.plan(1)

  const { create, emit } = build()

  function onWarning (warning) {
    t.equal(warning.code, 'CODE_1')
  }

  create('FastifyWarning', 'CODE_1', 'Msg', { unlimited: false })
  create('FastifyWarning', 'CODE_2', 'Msg', { unlimited: true })

  process.on('warning', onWarning)
  emit('CODE_1')
  emit('CODE_1')

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
