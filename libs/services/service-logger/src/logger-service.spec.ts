import { Module, OnModuleInit } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggerService } from './logger-service';
import { PinoInstance } from './pino-instance';
import exp = require('constants');

jest.mock('./pino-instance');

describe('LoggerService (Intergration)', () => {
  let pinoInstance: jest.Mocked<PinoInstance>;

  beforeAll(() => {
    pinoInstance = {
      write: jest.fn(),
    } as unknown as jest.Mocked<PinoInstance>;
    (PinoInstance.getInstance as jest.Mock).mockReturnValue(pinoInstance);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should replace the default logger with LoggerService', async () => {
    @Module({ providers: [LoggerService] })
    class TestAppModule implements OnModuleInit {
      constructor(private logger: LoggerService) {}
      onModuleInit() {
        this.logger.log('TestAppModule logging for test', 'TestAppModule');
      }
    }
    const app = await NestFactory.create(TestAppModule, {
      logger: new LoggerService(),
    });
    await app.init();

    expect(pinoInstance.write).toHaveBeenCalledTimes(4);
    expect(pinoInstance.write.mock.calls[0]).toStrictEqual([
      'info',
      { context: 'NestFactory' },
      'Starting Nest application...',
    ]);
    expect(pinoInstance.write.mock.calls[1]).toStrictEqual([
      'info',
      { context: 'InstanceLoader' },
      'TestAppModule dependencies initialized',
    ]);
    expect(pinoInstance.write.mock.calls[2]).toStrictEqual([
      'info',
      { context: 'TestAppModule' },
      'TestAppModule logging for test',
    ]);
    expect(pinoInstance.write.mock.calls[3]).toStrictEqual([
      'info',
      { context: 'NestApplication' },
      'Nest application successfully started',
    ]);
  });
});
