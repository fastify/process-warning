'use strict'

/* eslint no-prototype-builtins: 0 */

const test = require('ava')
const { createWarning, emitWarning } = require('./')

process.removeAllListeners('warning')

test('Create warning with zero parameter', t => {
  const NewWarn = createWarning('FastifyWarning', 'CODE', 'Not available')
  const err = new NewWarn()
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'Not available')
  t.is(err.code, 'CODE')
})

test('Create error with 1 parameter', t => {
  const NewWarn = createWarning('FastifyWarning', 'CODE', 'hey %s')
  const err = new NewWarn('alice')
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'hey alice')
  t.is(err.code, 'CODE')
})

test('Create error with 2 parameters', t => {
  const NewWarn = createWarning('FastifyWarning', 'CODE', 'hey %s, I like your %s')
  const err = new NewWarn('alice', 'attitude')
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'hey alice, I like your attitude')
  t.is(err.code, 'CODE')
})

test('Create error with 3 parameters', t => {
  const NewWarn = createWarning('FastifyWarning', 'CODE', 'hey %s, I like your %s %s')
  const err = new NewWarn('alice', 'attitude', 'see you')
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'hey alice, I like your attitude see you')
  t.is(err.code, 'CODE')
})

test('Should throw when error code has no fastify name', t => {
  try {
    createWarning()
  } catch (err) {
    t.is(err.message, 'Fastify warning name must not be empty')
  }
})

test('Should throw when error has no code', t => {
  try {
    createWarning('name')
  } catch (err) {
    t.is(err.message, 'Fastify warning code must not be empty')
  }
})

test('Should throw when error has no message', t => {
  try {
    createWarning('name', 'code')
  } catch (err) {
    t.is(err.message, 'Fastify warning message must not be empty')
  }
})

test('FastifyWarning.toString returns code', t => {
  const NewWarn = createWarning('FastifyWarning', 'CODE', 'foo')
  const err = new NewWarn()
  t.is(err.toString(), 'FastifyWarning [CODE]: foo')
})

test('Create the warning without the new keyword', t => {
  const NewWarn = createWarning('FastifyWarning', 'CODE', 'Not available')
  const err = NewWarn()
  t.true(err instanceof Error)
  t.is(err.name, 'FastifyWarning')
  t.is(err.message, 'Not available')
  t.is(err.code, 'CODE')
})

test.cb('emitWarning should emit a given code only once', t => {
  t.plan(3)
  process.on('warning', onWarning)
  function onWarning (warning) {
    t.is(warning.name, 'FastifyDeprecation')
    t.is(warning.code, 'CODE')
    t.is(warning.message, 'Hello world')
  }

  createWarning('FastifyDeprecation', 'CODE', 'Hello world')
  emitWarning('CODE')
  emitWarning('CODE')

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})

test.cb('emitWarning with interpolated string', t => {
  t.plan(3)
  process.on('warning', onWarning)
  function onWarning (warning) {
    t.is(warning.name, 'FastifyDeprecation')
    t.is(warning.code, 'CODE')
    t.is(warning.message, 'Hello world')
  }

  createWarning('FastifyDeprecation', 'CODE', 'Hello %s')
  emitWarning('CODE', 'world')
  emitWarning('CODE', 'world')

  setImmediate(() => {
    process.removeListener('warning', onWarning)
    t.end()
  })
})
