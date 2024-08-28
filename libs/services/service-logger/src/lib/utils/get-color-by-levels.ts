import { bold, cyanBright, green, magentaBright, red, yellow } from 'chalk';
import { LogLevel } from '../service-logger';

export function getColorByLogLevel(level: LogLevel) {
  switch (level) {
    case 'debug':
      return magentaBright;
    case 'warn':
      return yellow;
    case 'error':
      return red;
    case 'verbose':
      return cyanBright;
    case 'fatal':
      return bold;
    default:
      return green;
  }
}
