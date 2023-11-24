'use strict'

const { test } = require('tap')
const build = require('../')

test('emitted is a map<string, bool-like> object', t => {
  t.plan(8)

  const { emitted } = build()
  t.notOk(emitted.get('CODE'), 'not set yet')

  emitted.set('CODE', true)
  t.ok(emitted.get('CODE'), 'set to true')

  emitted.set('CODE', false)
  t.notOk(emitted.get('CODE'), 'set to false')

  t.ok(emitted.has('CODE'), 'has code')

  emitted.delete('CODE')
  t.notOk(emitted.get('CODE'), 'deleted')
  t.notOk(emitted.has('CODE'), 'does not has code')

  emitted.set('CODE', true)
  emitted.set('CODE', true)
  t.ok(emitted.get('CODE'), 'set to true twice')

  emitted.clear()
  t.notOk(emitted.get('CODE'), 'cleared')
})

test('state is a bool-like', t => {
  t.plan(8)

  const { emitted, emit, create } = build()

  create('CODE', 'CODE', 'Hello %s')
  create('CODE', 'CODE_UNLIMITED', 'Hello %s', { unlimited: true })
  // eslint-disable-next-line
  t.ok(emitted.get('CODE') == false, 'not called yet (coerced)')
  // eslint-disable-next-line
  t.ok(emitted.get('CODE_UNLIMITED') == false, 'not called yet (coerced)')
  t.notOk(emitted.get('CODE').isEmitted(), 'not called yet')
  t.notOk(emitted.get('CODE_UNLIMITED').isEmitted(), 'not called yet')

  emit('CODE', 'world')
  emit('CODE_UNLIMITED', 'world')

  // eslint-disable-next-line
  t.ok(emitted.get('CODE') == true, 'set to true (coerced)')
  // eslint-disable-next-line
  t.ok(emitted.get('CODE_UNLIMITED') == true, 'set to true (coerced)')
  t.ok(emitted.get('CODE').isEmitted(), 'set to true')
  t.ok(emitted.get('CODE_UNLIMITED').isEmitted(), 'set to true')
})
