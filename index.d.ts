declare function warning (): Warning

export declare class FastifyWarning extends Error {
  code: string
}

interface Warning {
  create(name: string, code: string, message: string): FastifyWarning,
  emit(cod: string, a?: any, b?: any, c?: any): void,
  emitted: Map<string, boolean>
}

export default warning
