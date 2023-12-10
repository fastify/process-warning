declare namespace processWarning {
  export type WarningItem = {
    name: string;
    code: string;
    message: string;
    emitted: boolean;
    unlimited: boolean;
    emit(a?: any, b?: any, c?: any): void;
    format(a?: any, b?: any, c?: any): string;
  }

  export type ProcessWarningOptions = {
    unlimited?: boolean;
  }

  export type ProcessWarning = {
    createWarning(name: string, code: string, message: string, opts?: ProcessWarningOptions): WarningItem;
    createDeprecation(code: string, message: string, opts?: ProcessWarningOptions): WarningItem;
  }

  export function createDeprecation(code: string, message: string, opts?: ProcessWarningOptions): WarningItem;
  export function createWarning(name: string, code: string, message: string, opts?: ProcessWarningOptions): WarningItem;

  const processWarning: ProcessWarning;
  export { processWarning as default };
}

export = processWarning;
