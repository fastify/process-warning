'use strict'

const { createWarning } = require('..')

const CUSTDEP001 = createWarning('DeprecationWarning', 'CUSTDEP001', 'This is a deprecation warning')

CUSTDEP001.emit()
