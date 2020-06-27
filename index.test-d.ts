import { expectType } from 'tsd'
import {
  FastifyWarning,
  createWarning,
  emitWarning,
  emittedWarnings
} from './'

const warn = createWarning('FastifyWarning', 'CODE', 'message')
expectType<FastifyWarning>(warn)
expectType<string>(warn.code)
expectType<string>(warn.message)

expectType<void>(emitWarning('CODE'))
expectType<Map<string, boolean>>(emittedWarnings)
