import { expect } from 'tstyche'
import { createWarning, createDeprecation } from '..'

const WarnInstance = createWarning({
  name: 'TypeScriptWarning',
  code: 'CODE',
  message: 'message'
})

expect(WarnInstance.code).type.toBe<string>()
expect(WarnInstance.message).type.toBe<string>()
expect(WarnInstance.name).type.toBe<string>()
expect(WarnInstance.emitted).type.toBe<boolean>()
expect(WarnInstance.unlimited).type.toBe<boolean>()

expect(WarnInstance()).type.toBe<void>()
expect(WarnInstance('foo')).type.toBe<void>()
expect(WarnInstance('foo', 'bar')).type.toBe<void>()

const buildWarnUnlimited = createWarning({
  name: 'TypeScriptWarning',
  code: 'CODE',
  message: 'message',
  unlimited: true
})

expect(buildWarnUnlimited.unlimited).type.toBe<boolean>()

const DeprecationInstance = createDeprecation({
  code: 'CODE',
  message: 'message'
})

expect(DeprecationInstance.code).type.toBe<string>()

expect(DeprecationInstance()).type.toBe<void>()
expect(DeprecationInstance('foo')).type.toBe<void>()
expect(DeprecationInstance('foo', 'bar')).type.toBe<void>()
