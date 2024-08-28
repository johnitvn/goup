import { bold, cyanBright, green, magentaBright, red, yellow } from 'chalk';
import { LogLevel } from '../service-logger';
import { getColorByLogLevel } from './get-color-by-levels';

describe('getColorByLogLevel', () => {
  it('should return magentaBright color for debug log level', () => {
    const result = getColorByLogLevel('debug' as LogLevel);
    expect(result).toBe(magentaBright);
  });

  it('should return yellow color for warn log level', () => {
    const result = getColorByLogLevel('warn' as LogLevel);
    expect(result).toBe(yellow);
  });

  it('should return red color for error log level', () => {
    const result = getColorByLogLevel('error' as LogLevel);
    expect(result).toBe(red);
  });

  it('should return cyanBright color for verbose log level', () => {
    const result = getColorByLogLevel('verbose' as LogLevel);
    expect(result).toBe(cyanBright);
  });

  it('should return bold color for fatal log level', () => {
    const result = getColorByLogLevel('fatal' as LogLevel);
    expect(result).toBe(bold);
  });

  it('should return green color for other log levels', () => {
    const result = getColorByLogLevel('log' as LogLevel);
    expect(result).toBe(green);
  });
});
