'use strict'

const test = require('ava')
const build = require('./')

process.removeAllListeners('warning')

test('Create warning with zero parameter', t => {
  const { create } = build()
  const NewWarn = create('FastifyWarning', 'CODE', 'Not available')
  const err = new NewWarn()
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'Not available')
  t.is(err.code, 'CODE')
})

test('Create error with 1 parameter', t => {
  const { create } = build()
  const NewWarn = create('FastifyWarning', 'CODE', 'hey %s')
  const err = new NewWarn('alice')
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'hey alice')
  t.is(err.code, 'CODE')
})

test('Create error with 2 parameters', t => {
  const { create } = build()
  const NewWarn = create('FastifyWarning', 'CODE', 'hey %s, I like your %s')
  const err = new NewWarn('alice', 'attitude')
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'hey alice, I like your attitude')
  t.is(err.code, 'CODE')
})

test('Create error with 3 parameters', t => {
  const { create } = build()
  const NewWarn = create('FastifyWarning', 'CODE', 'hey %s, I like your %s %s')
  const err = new NewWarn('alice', 'attitude', 'see you')
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'hey alice, I like your attitude see you')
  t.is(err.code, 'CODE')
})

test('Should throw when error code has no fastify name', t => {
  const { create } = build()
  try {
    create()
  } catch (err) {
    t.is(err.message, 'Fastify warning name must not be empty')
  }
})

test('Should throw when error has no code', t => {
  const { create } = build()
  try {
    create('name')
  } catch (err) {
    t.is(err.message, 'Fastify warning code must not be empty')
  }
})

test('Should throw when error has no message', t => {
  const { create } = build()
  try {
    create('name', 'code')
  } catch (err) {
    t.is(err.message, 'Fastify warning message must not be empty')
  }
})

test('FastifyWarning.toString returns code', t => {
  const { create } = build()
  const NewWarn = create('FastifyWarning', 'CODE', 'foo')
  const err = new NewWarn()
  t.is(err.toString(), 'FastifyWarning [CODE]: foo')
})

test('Create the warning without the new keyword', t => {
  const { create } = build()
  const NewWarn = create('FastifyWarning', 'CODE', 'Not available')
  const err = NewWarn()
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'Not available')
  t.is(err.code, 'CODE')
})

test.serial.cb('emit should emit a given code only once', t => {
  t.plan(4)
  const { create, emit, emitted } = build()

  process.on('warning', onWarning)
  function onWarning (warning) {
    t.is(warning.name, 'FastifyDeprecation')
    t.is(warning.code, 'CODE')
    t.is(warning.message, 'Hello world')
    t.true(emitted.get('CODE'))
  }

  create('FastifyDeprecation', 'CODE', 'Hello world')
  emit('CODE')
  emit('CODE')
  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})

test.serial.cb('emit with interpolated string', t => {
  t.plan(4)
  const { create, emit, emitted } = build()

  process.on('warning', onWarning)
  function onWarning (warning) {
    t.is(warning.name, 'FastifyDeprecation')
    t.is(warning.code, 'CODE')
    t.is(warning.message, 'Hello world')
    t.true(emitted.get('CODE'))
  }

  create('FastifyDeprecation', 'CODE', 'Hello %s')
  emit('CODE', 'world')
  emit('CODE', 'world')

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})

test('Cannot reuse the same code more than once', t => {
  const { create } = build()
  create('FastifyWarning', 'CODE', 'Not available')
  try {
    create('FastifyWarning', 'CODE', 'Not available')
  } catch (err) {
    t.is(err.message, "The code 'CODE' already exist")
  }
})
