/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoggerService as ILoggerService, Injectable, Scope } from '@nestjs/common';
import { Level } from 'pino';
import { PinoInstance } from './pino-instance';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements ILoggerService {
  verbose(message: any, ...optionalParams: any[]) {
    this.call('trace', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.call('debug', message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    this.call('info', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.call('warn', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.call('error', message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.call('fatal', message, ...optionalParams);
  }

  private call(level: Level, message: any, ...optionalParams: any[]) {
    const objArg: Record<string, any> = {};

    // optionalParams contains extra params passed to logger
    // context name is the last item (this is convention in nestjs logger)
    let params: any[] = [];
    if (optionalParams.length !== 0 && typeof optionalParams[optionalParams.length - 1] === 'string') {
      objArg['context'] = optionalParams[optionalParams.length - 1];
      params = optionalParams.slice(0, -1);
    }

    if (typeof message === 'object') {
      if (message instanceof Error) {
        objArg['err'] = message;
      } else {
        Object.assign(objArg, message);
      }
      PinoInstance.getInstance().write(level, objArg, ...params);
    } else if (this.isWrongExceptionsHandlerContract(level, message, params)) {
      objArg['err'] = new Error(message);
      objArg['err'].stack = params[0];
      PinoInstance.getInstance().write(level, objArg);
    } else {
      PinoInstance.getInstance().write(level, objArg, message, ...params);
    }
  }

  /**
   * Unfortunately built-in (not only) `^.*Exception(s?)Handler$` classes call `.error`
   * method with not supported contract:
   *
   * - ExceptionsHandler
   * @see https://github.com/nestjs/nest/blob/35baf7a077bb972469097c5fea2f184b7babadfc/packages/core/exceptions/base-exception-filter.ts#L60-L63
   *
   * - ExceptionHandler
   * @see https://github.com/nestjs/nest/blob/99ee3fd99341bcddfa408d1604050a9571b19bc9/packages/core/errors/exception-handler.ts#L9
   *
   * - WsExceptionsHandler
   * @see https://github.com/nestjs/nest/blob/9d0551ff25c5085703bcebfa7ff3b6952869e794/packages/websockets/exceptions/base-ws-exception-filter.ts#L47-L50
   *
   * - RpcExceptionsHandler @see https://github.com/nestjs/nest/blob/9d0551ff25c5085703bcebfa7ff3b6952869e794/packages/microservices/exceptions/base-rpc-exception-filter.ts#L26-L30
   *
   * - all of them
   * @see https://github.com/search?l=TypeScript&q=org%3Anestjs+logger+error+stack&type=Code
   */
  private isWrongExceptionsHandlerContract(level: Level, message: any, params: any[]): params is [string] {
    return (
      (level === 'error' || level === 'fatal') &&
      typeof message === 'string' &&
      params.length === 1 &&
      typeof params[0] === 'string' &&
      /\n\s*at /.test(params[0])
    );
  }
}
