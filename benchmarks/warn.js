'use strict'

const { Suite } = require('benchmark')
const { createWarning } = require('..')

const err1 = createWarning('FastifyWarning', 'FST_ERROR_CODE_1', 'message')
const err2 = createWarning('FastifyWarning', 'FST_ERROR_CODE_2', 'message')

new Suite()
  .add('warn', function () {
    err1.emit()
    err2.emit()
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .run()
