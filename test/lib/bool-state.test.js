'use strict'

const tap = require('tap')
const STATE = require('../../lib/bool-state')

tap.test('code returns a state code', async t => {
  const state = new STATE()
  t.equal(state.code, STATE.UNLIMITED_INITIAL)

  for (let i = -1; i < 3; i += 1) {
    const state = new STATE(i)
    t.equal(state.code, i)
  }
})

tap.test('code can be set', async t => {
  const state = new STATE(STATE.LIMITED_INITIAL)
  t.equal(state.code, STATE.LIMITED_INITIAL)
  state.code = STATE.LIMITED_FINAL
  t.equal(state.code, STATE.LIMITED_FINAL)
})

tap.test('isEmitted returns primitive', async t => {
  const state = new STATE(STATE.LIMITED_INITIAL)
  t.equal(state.isEmitted(), false)

  state.code = STATE.LIMITED_FINAL
  t.equal(state.isEmitted(), true)

  state.code = STATE.UNLIMITED_INITIAL
  t.equal(state.isEmitted(), false)

  state.code = STATE.UNLIMITED_ONGOING
  t.equal(state.isEmitted(), true)
})
