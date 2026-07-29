'use strict'

const { test } = require('node:test')
const { createWarning } = require('..')
const { spyWarning } = require('..')

test('Spy ProcessWarning - unlimited: false', t => {
  const warning = createWarning({
    name: 'Warning',
    code: 'WRN',
    message: 'Hello %s'
  })
  const spyData = spyWarning(warning)

  t.assert.strictEqual(warning.emitted, false)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls[0].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[0].result, true)
  t.assert.strictEqual(spyData.callCount(), 1)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls[0].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[0].result, true)
  t.assert.deepStrictEqual(spyData.calls[1].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[1].result, false)
  t.assert.strictEqual(spyData.callCount(), 2)

  spyData.reset()
  t.assert.strictEqual(warning.emitted, false)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls[0].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[0].result, true)
  t.assert.strictEqual(spyData.callCount(), 1)

  spyData.restore()
  t.assert.strictEqual(warning.emitted, false)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)
})

test('Spy ProcessWarning - unlimited: true', t => {
  const warning = createWarning({
    name: 'Warning',
    code: 'WRN',
    message: 'Hello %s',
    unlimited: true
  })
  const spyData = spyWarning(warning)

  t.assert.strictEqual(warning.emitted, false)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls[0].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[0].result, true)
  t.assert.strictEqual(spyData.callCount(), 1)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls[0].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[0].result, true)
  t.assert.deepStrictEqual(spyData.calls[1].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[1].result, true)
  t.assert.strictEqual(spyData.callCount(), 2)

  spyData.reset()
  t.assert.strictEqual(warning.emitted, false)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls[0].arguments, ['World'])
  t.assert.strictEqual(spyData.calls[0].result, true)
  t.assert.strictEqual(spyData.callCount(), 1)

  spyData.restore()
  t.assert.strictEqual(warning.emitted, false)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)

  warning('World')
  t.assert.strictEqual(warning.emitted, true)
  t.assert.deepStrictEqual(spyData.calls, [])
  t.assert.strictEqual(spyData.callCount(), 0)
})
