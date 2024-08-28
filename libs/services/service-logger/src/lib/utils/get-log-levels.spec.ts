import { getLogLevels } from './get-log-levels';

describe('getLogLevels', () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env['LOG'];
  });

  it('should return log levels from environment variable', () => {
    process.env['LOG'] = 'error, warn, fatal';
    const result = getLogLevels();
    expect(result).toEqual(['error', 'warn', 'fatal']);
  });

  it('should return log levels with all higher levels', () => {
    process.env['LOG'] = 'error, warn, debug';
    const result = getLogLevels();
    expect(result).toEqual(['error', 'warn', 'debug', 'fatal']);
  });

  it('should return all log levels if LOG environment variable is not set', () => {
    const result = getLogLevels();
    expect(result).toEqual(['info', 'error', 'warn', 'debug', 'verbose', 'fatal']);
  });

  it('should throw error if LOG environment variable contains invalid log levels', () => {
    process.env['LOG'] = 'error, invalid, warn';
    expect(() => {
      getLogLevels();
    }).toThrowError('Evironment variable LOG is invalid');
  });
});
