'use strict'

const { Suite } = require('benchmark')
const warning = require('..')()

warning.create('FastifyWarning', 'FST_ERROR_CODE', 'message')
new Suite()
  .add('warn', function () {
    warning.emit('FST_ERROR_CODE')
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  // run async
  .run()
