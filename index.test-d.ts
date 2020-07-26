import { expectType } from 'tsd'
import Warinig, { FastifyWarning } from './'

const warning = Warinig()
const warn = warning.create('FastifyWarning', 'CODE', 'message')
expectType<FastifyWarning>(warn)
expectType<string>(warn.code)
expectType<string>(warn.message)

expectType<void>(warning.emit('CODE'))
expectType<Map<string, boolean>>(warning.emitted)
