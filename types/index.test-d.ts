import { expectType } from 'tsd'
import { createWarning, createDeprecation } from '..'

const WarnInstance = createWarning('FastifyWarning', 'CODE', 'message')

expectType<string>(WarnInstance.code)
expectType<string>(WarnInstance.message)
expectType<string>(WarnInstance.name)
expectType<boolean>(WarnInstance.emitted)
expectType<boolean>(WarnInstance.unlimited)

expectType<void>(WarnInstance.emit())
expectType<void>(WarnInstance.emit('foo'))
expectType<void>(WarnInstance.emit('foo', 'bar'))

const buildWarnUnlimited = createWarning('FastifyWarning', 'CODE', 'message', { unlimited: true })
expectType<boolean>(buildWarnUnlimited.unlimited)

const DeprecationInstance = createDeprecation('CODE', 'message')
expectType<string>(DeprecationInstance.code)

DeprecationInstance.emit()
DeprecationInstance.emit('foo')
DeprecationInstance.emit('foo', 'bar')
