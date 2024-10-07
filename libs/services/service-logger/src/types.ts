export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
  SILENT = 'silent',
}
export enum LogFormat {
  JSON = 'json',
  TEXT = 'text',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoggerFn = ((msg: string, ...args: any[]) => void) | ((obj: object, msg?: string, ...args: any[]) => void);
