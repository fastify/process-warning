'use strict'

const { test } = require('tap')
const build = require('..')

test('Must not overwrite the global config', t => {
  t.plan(3)

  const { create, emit } = build()

  let i = 0

  function onWarning (warning) {
    if (i++ === 0) {
      t.equal(warning.code, 'CODE_1')
    } else {
      t.equal(warning.code, 'CODE_2')
    }
  }

  create('FastifyWarning', 'CODE_1', 'Msg', { unlimited: false })
  create('FastifyWarning', 'CODE_2', 'Msg', { unlimited: true })

  process.on('warning', onWarning)
  emit('CODE_1')
  emit('CODE_2')
  emit('CODE_1')
  emit('CODE_2')

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
