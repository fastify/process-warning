declare namespace processWarning {
  export type WarningItem = {
    name: string,
    code: string,
    message: string,
    emitted: boolean,
    emit(...args: any[]): void,
    format(...args: any[]): string,
  }

  export type ProcessWarningOptions = {
    unlimited?: boolean,
  }

  export type ProcessWarning = {
    createWarning(name: string, code: string, message: string, opts?: ProcessWarningOptions): WarningItem,
    createDeprecation(code: string, message: string, opts?: ProcessWarningOptions): WarningItem,
  }

  const processWarning: ProcessWarning;
  export { processWarning as default };
}

export = processWarning;
