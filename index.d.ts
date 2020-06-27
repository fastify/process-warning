export interface FastifyWarning extends Error {
  code: string
}

export declare function createWarning (
  name: string,
  code: string,
  message: string
): FastifyWarning

export declare function emitWarning (
  code: string,
  a?: any,
  b?: any,
  c?: any
): void
