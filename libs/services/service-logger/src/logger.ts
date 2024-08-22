import pino from 'pino';
import { PinoInstance } from './pino-instance';
import { LoggerFn } from './types';

/**
 * Lớp PinoLogger cung cấp các phương thức để ghi log với các mức độ khác nhau.
 */
export class Logger {
  constructor(private context?: string) {}

  /**
   * Ghi log với mức độ trace.
   * @param msg Thông điệp log.
   * @param args Các tham số bổ sung.
   */
  trace(msg: string, ...args: any[]): void;
  trace(obj: unknown, msg?: string, ...args: any[]): void;
  trace(...args: Parameters<LoggerFn>) {
    this.call('trace', ...args);
  }

  /**
   * Ghi log với mức độ debug.
   * @param msg Thông điệp log.
   * @param args Các tham số bổ sung.
   */
  debug(msg: string, ...args: any[]): void;
  debug(obj: unknown, msg?: string, ...args: any[]): void;
  debug(...args: Parameters<LoggerFn>) {
    this.call('debug', ...args);
  }

  /**
   * Ghi log với mức độ info.
   * @param msg Thông điệp log.
   * @param args Các tham số bổ sung.
   */
  info(msg: string, ...args: any[]): void;
  info(obj: unknown, msg?: string, ...args: any[]): void;
  info(...args: Parameters<LoggerFn>) {
    this.call('info', ...args);
  }

  /**
   * Ghi log với mức độ warn.
   * @param msg Thông điệp log.
   * @param args Các tham số bổ sung.
   */
  warn(msg: string, ...args: any[]): void;
  warn(obj: unknown, msg?: string, ...args: any[]): void;
  warn(...args: Parameters<LoggerFn>) {
    this.call('warn', ...args);
  }

  /**
   * Ghi log với mức độ error.
   * @param msg Thông điệp log.
   * @param args Các tham số bổ sung.
   */
  error(msg: string, ...args: any[]): void;
  error(obj: unknown, msg?: string, ...args: any[]): void;
  error(...args: Parameters<LoggerFn>) {
    this.call('error', ...args);
  }

  /**
   * Ghi log với mức độ fatal.
   * @param msg Thông điệp log.
   * @param args Các tham số bổ sung.
   */
  fatal(msg: string, ...args: any[]): void;
  fatal(obj: unknown, msg?: string, ...args: any[]): void;
  fatal(...args: Parameters<LoggerFn>) {
    this.call('fatal', ...args);
  }

  /**
   * Thiết lập ngữ cảnh cho logger.
   * @param value Giá trị ngữ cảnh.
   */
  setContext(value: string) {
    this.context = value;
  }

  /**
   * Gọi phương thức ghi log của Pino với mức độ và các tham số đã cho.
   * @param level Mức độ log.
   * @param args Các tham số log.
   */
  protected call(level: pino.Level, ...args: Parameters<LoggerFn>) {
    if (typeof args[0] === 'object') {
      const firstArg = args[0];
      if (firstArg instanceof Error) {
        args = [Object.assign({ ['context']: this.context }, { ['err']: firstArg }), ...args.slice(1)];
      } else {
        args = [Object.assign({ ['context']: this.context }, firstArg), ...args.slice(1)];
      }
    } else {
      args = [{ ['context']: this.context }, ...args] as Parameters<LoggerFn>;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore args are union of tuple types
    PinoInstance.getInstance().write(level, ...args);
  }
}
