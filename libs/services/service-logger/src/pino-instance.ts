import pino from 'pino';
import { PinoPretty as pretty } from 'pino-pretty';
import { LogFormat, LoggerFn, LogLevel } from './types';

/**
 * @class Pino
 * @description Lớp này cung cấp một singleton logger sử dụng thư viện Pino.
 */
export class PinoInstance {
  private pinoLogger: pino.Logger;
  private static instance: PinoInstance;

  /**
   * @method getInstance
   * @description Trả về instance duy nhất của lớp Pino.
   * @returns {PinoInstance} Instance của lớp Pino.
   */
  public static getInstance() {
    if (!PinoInstance.instance) {
      PinoInstance.instance = new PinoInstance();
    }
    return PinoInstance.instance;
  }

  /**
   * @constructor
   * @description Khởi tạo một instance mới của lớp Pino. Hàm này là private để đảm bảo rằng chỉ có một instance duy nhất được tạo ra.
   */
  private constructor() {
    const { format, level } = this.validateEnviromentVariable();
    this.pinoLogger = this.createLogger(format, level);
  }

  /**
   * @method createLogger
   * @description Tạo một logger mới với các cấu hình được cung cấp.
   * @param {LogFormat} format - Định dạng log.
   * @param {LogLevel} level - Mức độ log.
   * @returns {pino.Logger} Logger được tạo ra.
   */
  private createLogger(format: LogFormat, level: LogLevel): pino.Logger {
    const options: pino.LoggerOptions = {
      level,
    };

    let stream = undefined;
    if (format === LogFormat.TEXT) {
      stream = pretty({
        sync: true,
        colorize: true,
        colorizeObjects: true,
        ignore: 'pid,hostname,context',
        messageFormat: '[{pid}] [{context}] {msg}',
      });
    }
    return pino(options, stream);
  }

  /**
   * @method write
   * @description Ghi log với mức độ và các tham số được cung cấp.
   * @param {pino.Level} method - Mức độ log (trace, debug, info, warn, error, fatal, silent).
   * @param {...Parameters<LoggerFn>} args - Các tham số log.
   */
  public write(method: pino.Level, ...args: Parameters<LoggerFn>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore args are union of tuple types
    this.pinoLogger[method](...args);
  }

  /**
   * @method validateEnviroment
   * @description Kiểm tra và xác thực các biến môi trường liên quan đến logging.
   * @returns {Object} Đối tượng chứa các thông tin về format, level
   * @throws {Error} Nếu các biến môi trường không hợp lệ.
   */
  private validateEnviromentVariable(): {
    format: LogFormat;
    level: LogLevel;
  } {
    const errors: Array<string> = [];

    const format = process.env['LOG_FORMAT'] || 'json';
    if (!Object.values(LogFormat).includes(format as LogFormat)) {
      errors.push('LOG_FORMAT environment must be json, text');
    }

    const level = process.env['LOG_LEVEL'] || 'info';
    if (!Object.values(LogLevel).includes(level as LogLevel)) {
      errors.push('LOG_LEVEL environment must be trace, debug, info, warn, error, fatal or silent');
    }
    if (errors.length > 0) {
      // create error for getting stack trace
      const error = Error(`Logging environment invalid:\n - ${errors.join('\n - ')}`);
      // manually log error to console
      console.error(error);
      // exit process
      process.exit(1);
    }
    return {
      format: format as LogFormat,
      level: level as LogLevel,
    };
  }
}
