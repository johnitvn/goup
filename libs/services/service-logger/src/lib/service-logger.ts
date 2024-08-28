import { LoggerService, Optional } from '@nestjs/common';
import { isFunction, isPlainObject, isString, isUndefined } from '@nestjs/common/utils/shared.utils';
import { green, yellow } from 'chalk';
import { getColorByLogLevel } from './utils/get-color-by-levels';
import { getLogLevels } from './utils/get-log-levels';

export type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
});

export class ServiceLogger implements LoggerService {
  protected static PROJECT: string;
  protected static LOG_LEVELS: LogLevel[];
  protected static LAST_TIMESTAMP?: number;
  private originalContext?: string;

  constructor(
    @Optional()
    protected context?: string,
    @Optional()
    protected timestamp?: boolean,
    @Optional()
    project?: string
  ) {
    if (project && ServiceLogger.PROJECT) {
      throw new Error('Only setup logger project at onetime!');
    } else if (project && !ServiceLogger.PROJECT) {
      ServiceLogger.PROJECT = project;
    }

    if (!ServiceLogger.LOG_LEVELS) {
      ServiceLogger.LOG_LEVELS = getLogLevels();
    }

    if (context) {
      this.originalContext = context;
    }
  }

  /**
   * Write a 'log' level log, if the configured level allows for it.
   */
  info(message: any, context?: string): void;
  info(message: any, ...optionalParams: [...any, string?]): void;
  info(message: any, ...optionalParams: any[]) {
    if (!ServiceLogger.LOG_LEVELS.includes('info')) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([message, ...optionalParams]);
    this.writeMessages(messages, 'info', context);
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(message: any, ...optionalParams: any[]) {
    const { messages, context } = this.getContextAndMessagesToPrint([message, ...optionalParams]);
    if (
      context &&
      [
        'NestFactory',
        'InstanceLoader',
        'RoutesResolver',
        'RouterExplorer',
        'NestApplication',
        'NestMicroservice',
      ].includes(context)
    ) {
      if (!ServiceLogger.LOG_LEVELS.includes('debug')) {
        return;
      }
      // change level
      this.writeMessages(messages, 'debug', context);
    } else {
      if (!ServiceLogger.LOG_LEVELS.includes('info')) {
        return;
      }
      this.writeMessages(messages, 'info', context);
    }
  }

  /**
   * Write a 'warn' level log, if the configured level allows for it.
   */
  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(message: any, ...optionalParams: any[]) {
    if (!ServiceLogger.LOG_LEVELS.includes('warn')) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([message, ...optionalParams]);
    this.writeMessages(messages, 'warn', context);
  }

  /**
   * Write a 'debug' level log, if the configured level allows for it.
   */
  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(message: any, ...optionalParams: any[]) {
    if (!ServiceLogger.LOG_LEVELS.includes('debug')) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([message, ...optionalParams]);
    this.writeMessages(messages, 'debug', context);
  }

  /**
   * Write a 'verbose' level log, if the configured level allows for it.
   */
  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(message: any, ...optionalParams: any[]) {
    if (!ServiceLogger.LOG_LEVELS.includes('verbose')) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([message, ...optionalParams]);
    this.writeMessages(messages, 'verbose', context);
  }

  /**
   * Write an 'error' level log, if the configured level allows for it.
   */
  error(message: any, stackOrContext?: string): void;
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?, string?]): void;
  error(message: any, ...optionalParams: any[]) {
    if (!ServiceLogger.LOG_LEVELS.includes('error')) {
      return;
    }
    const { messages, context, stack } = this.getContextAndStackAndMessagesToPrint([message, ...optionalParams]);
    this.writeMessages(messages, 'error', context, stack);
  }

  /**
   * Write a 'fatal' level log, if the configured level allows for it.
   */
  fatal(message: any, stackOrContext?: string): void;
  fatal(message: any, stack?: string, context?: string): void;
  fatal(message: any, ...optionalParams: [...any, string?, string?]): void;
  fatal(message: any, ...optionalParams: any[]) {
    if (!ServiceLogger.LOG_LEVELS.includes('fatal')) {
      return;
    }
    const { messages, context, stack } = this.getContextAndStackAndMessagesToPrint([message, ...optionalParams]);
    this.writeMessages(messages, 'fatal', context, stack);
  }

  /**
   * Set logger context
   * @param context context
   */
  setContext(context: string) {
    this.context = context;
  }

  /**
   * Resets the logger context to the value that was passed in the constructor.
   */
  resetContext() {
    this.context = this.originalContext;
  }

  protected getTimestamp(): string {
    return dateTimeFormatter.format(Date.now());
  }

  private getContextAndMessagesToPrint(args: unknown[]) {
    if (args?.length <= 1) {
      return { messages: args, context: this.context };
    }
    const lastElement = args[args.length - 1];
    const isContext = isString(lastElement);
    if (!isContext) {
      return { messages: args, context: this.context };
    }
    return {
      context: lastElement as string,
      messages: args.slice(0, args.length - 1),
    };
  }

  private getContextAndStackAndMessagesToPrint(args: unknown[]) {
    if (args.length === 2) {
      return this.isStackFormat(args[1])
        ? {
            messages: [args[0]],
            stack: args[1] as string,
            context: this.context,
          }
        : {
            messages: [args[0]],
            context: args[1] as string,
          };
    }

    const { messages, context } = this.getContextAndMessagesToPrint(args);
    if (messages?.length <= 1) {
      return { messages, context };
    }
    const lastElement = messages[messages.length - 1];
    const isStack = isString(lastElement);
    // https://github.com/nestjs/nest/issues/11074#issuecomment-1421680060
    if (!isStack && !isUndefined(lastElement)) {
      return { messages, context };
    }
    return {
      stack: lastElement as string,
      messages: messages.slice(0, messages.length - 1),
      context,
    };
  }

  private isStackFormat(stack: unknown) {
    if (!isString(stack) && !isUndefined(stack)) {
      return false;
    }
    return /^(.)+\n\s+at .+:\d+:\d+/.test(stack as string);
  }

  protected writeMessages(messages: unknown[], logLevel: LogLevel, context?: string, stack?: string) {
    messages.forEach((message) => {
      this.writeToStd(message, logLevel, context, stack);
    });
  }

  protected writeToStd(message: unknown, logLevel: LogLevel, context?: string, stack?: string) {
    const contextMessage = this.formatContext(context);
    const timestampDiff = this.updateAndGetTimestampDiff();
    const formattedLogLevel = logLevel.toUpperCase().padStart(7, ' ');
    const formattedMessage = this.formatMessage(logLevel, message, formattedLogLevel, contextMessage, timestampDiff);
    if (logLevel == 'error' || logLevel == 'fatal') {
      process.stderr.write(formattedMessage + '\n');
    } else if (logLevel == 'warn') {
      process.stdout.write(formattedMessage + '\n');
    } else if (logLevel == 'info') {
      process.stdout.write(formattedMessage + '\n');
    } else if (logLevel == 'debug') {
      process.stdout.write(formattedMessage + '\n');
    } else if (logLevel == 'verbose') {
      process.stdout.write(formattedMessage + '\n');
    }
    if (stack) {
      process.stderr.write(`\n${stack}\n\n`);
    }
  }

  protected formatContext(context?: string): string {
    return context ? green(`[${context}] `) : '';
  }

  protected formatMessage(
    logLevel: LogLevel,

    message: unknown,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string
  ) {
    const output = this.stringifyMessage(message, logLevel);
    formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
    return `${this.getTimestamp()} ${formattedLogLevel} ${contextMessage}${output}${timestampDiff}`;
  }

  protected stringifyMessage(message: unknown, logLevel: LogLevel): string {
    if (isFunction(message)) {
      const messageAsStr = Function.prototype.toString.call(message);
      const isClass = messageAsStr.startsWith('class ');
      if (isClass) {
        // If the message is a class, we will display the class name.
        return this.stringifyMessage(message, logLevel);
      }
      // If the message is a non-class function, call it and re-resolve its value.
      return this.stringifyMessage(message, logLevel);
    }

    return isPlainObject(message) || Array.isArray(message)
      ? `${this.colorize('Object:', logLevel)}\n${JSON.stringify(
          message,
          (key, value) => (typeof value === 'bigint' ? value.toString() : value),
          2
        )}\n`
      : this.colorize(message as string, logLevel);
  }

  protected colorize(message: string, logLevel: LogLevel) {
    const color = getColorByLogLevel(logLevel);
    return color(message);
  }

  protected updateAndGetTimestampDiff(): string {
    const result =
      ServiceLogger.LAST_TIMESTAMP && this.timestamp
        ? this.formatTimestampDiff(Date.now() - ServiceLogger.LAST_TIMESTAMP)
        : '';
    ServiceLogger.LAST_TIMESTAMP = Date.now();
    return result;
  }

  protected formatTimestampDiff(timestampDiff: number) {
    return yellow(` +${timestampDiff}ms`);
  }
}
