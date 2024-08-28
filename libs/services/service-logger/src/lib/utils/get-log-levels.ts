import { bold, yellow } from 'chalk';
import { LogLevel } from '../service-logger';

const ALL_LOG_LEVELS = ['info', 'error', 'warn', 'debug', 'verbose', 'fatal'];
const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  verbose: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};

/**
 * Checks if target level is enabled.
 * @param targetLevel target level
 * @param logLevels array of enabled log levels
 */
function isLogLevelEnabled(targetLevel: LogLevel, logLevels: LogLevel[] | undefined): boolean {
  if (!logLevels || (Array.isArray(logLevels) && logLevels?.length === 0)) {
    return false;
  }
  if (logLevels.includes(targetLevel)) {
    return true;
  }
  const highestLogLevelValue = logLevels.map((level) => LOG_LEVEL_VALUES[level]).sort((a, b) => b - a)?.[0];
  const targetLevelValue = LOG_LEVEL_VALUES[targetLevel];
  return targetLevelValue >= highestLogLevelValue;
}

/**
 * Get log level from ENV
 * @returns
 */
export const getLogLevels = (): LogLevel[] => {
  if (process.env['LOG']) {
    const logLevelsEnv = process.env['LOG'].split(',').map((level) => level.trim());
    if (logLevelsEnv.every((level) => ALL_LOG_LEVELS.includes(level))) {
      const logLevels = logLevelsEnv as LogLevel[];
      const enabledLogLevels: LogLevel[] = [];
      for (let i = 0; i < ALL_LOG_LEVELS.length; i++) {
        const level = ALL_LOG_LEVELS[i];
        if (isLogLevelEnabled(level as LogLevel, logLevels)) {
          enabledLogLevels.push(level as LogLevel);
        }
      }
      return enabledLogLevels;
    } else {
      throw new Error('Evironment variable LOG is invalid');
    }
  } else {
    process.stdout.write(yellow(`Environment variale ${bold('LOG')} is not set show all log will be display!\n`));
    process.stdout.write(yellow(`You should set ${bold('LOG')} enviroment variable in production!\n`));
    return ALL_LOG_LEVELS as LogLevel[];
  }
};
