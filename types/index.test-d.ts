import { expectType } from 'tsd'
import { createWarning, createDeprecation } from '../index'

const code = createWarning('FastifyWarning', 'CODE', 'message')

expectType<string>(code.code)
expectType<string>(code.message)
expectType<string>(code.name)
expectType<boolean>(code.emitted)
expectType<boolean>(code.unlimited)

expectType<void>(code.emit())
expectType<void>(code.emit('foo'))
expectType<void>(code.emit('foo', 'bar'))

const buildWarnUnlimited = createWarning('FastifyWarning', 'CODE', 'message', { unlimited: true })
expectType<boolean>(buildWarnUnlimited.unlimited)

const deprecation = createDeprecation('CODE', 'message')
expectType<string>(deprecation.code)