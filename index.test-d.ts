import { expectType } from 'tsd'
import { FastifyWarning, createWarning, emitWarning} from './'

const warn = createWarning('FastifyWarning', 'CODE', 'message')
expectType<FastifyWarning>(warn)
expectType<string>(warn.code)
expectType<string>(warn.message)

expectType<void>(emitWarning('CODE'))
