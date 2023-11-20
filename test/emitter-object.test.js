'use strict'

const { test } = require('tap')
const build = require('../')

test('emitted is a map<string, bool> object', t => {
  t.plan(8)

  const { emitted } = build()
  t.equal(emitted.get('CODE'), false, 'not set yet')

  emitted.set('CODE', true)
  t.equal(emitted.get('CODE'), true, 'set to true')

  emitted.set('CODE', false)
  t.equal(emitted.get('CODE'), false, 'set to false')

  t.equal(emitted.has('CODE'), true, 'has code')

  emitted.delete('CODE')
  t.equal(emitted.get('CODE'), false, 'deleted')
  t.equal(emitted.has('CODE'), false, 'has code')

  emitted.set('CODE', true)
  emitted.set('CODE', true)
  t.equal(emitted.get('CODE'), true, 'set to true twice')

  emitted.clear()
  t.equal(emitted.get('CODE'), false, 'cleared')
})
