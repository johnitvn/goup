import { EmptyObject } from '@goup/common-types';
import { GrpcController } from '@goup/service-grpc';
import { GrpcClientTesting, GrpcServerTesting } from '@goup/service-testing';
import { Metadata, status } from '@grpc/grpc-js';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { join } from 'path';
import { firstValueFrom, Observable } from 'rxjs';
import { GrpcException } from '../src/';

interface ExceptionTestService {
  getException(data: EmptyObject, metadata?: Metadata, ...rest: any[]): Observable<EmptyObject>;
}

@GrpcController()
class ExceptionTestController implements ExceptionTestService {
  getException(): Observable<EmptyObject> {
    const metadata = new Metadata();
    metadata.add('test-key', 'test-value');
    throw new GrpcException('Unknow error message.', status.ALREADY_EXISTS, metadata);
  }
}

describe('GrpcException', () => {
  const SERVER_START_TIMEOUT = 10000;
  let grpcServer: GrpcServerTesting;
  let activeLanguageServiceProxy: ClientGrpcProxy;
  let activeLanguageService: ExceptionTestService;

  beforeAll(async () => {
    grpcServer = await GrpcServerTesting.createGrpcServer(
      {
        controllers: [ExceptionTestController],
      },
      {
        packageName: `test`,
        protoFile: join(__dirname, 'grpc-exception.proto'),
        timeout: SERVER_START_TIMEOUT,
      }
    );
    activeLanguageServiceProxy = await GrpcClientTesting.createGrpcClient(grpcServer.options);
    activeLanguageService = activeLanguageServiceProxy.getService<ExceptionTestService>('ExceptionTestService');
  }, SERVER_START_TIMEOUT);

  afterAll(async () => {
    activeLanguageServiceProxy.close();
    await grpcServer.stop();
  });

  it('should bypass all information grpc status code', async () => {
    try {
      await firstValueFrom(activeLanguageService.getException({}));
      fail('Should throw an error');
    } catch (error) {
      expect(error.code).toBe(status.ALREADY_EXISTS);
      expect(error.details).toBe('Unknow error message.');
      expect(error.metadata.get('test-key')[0]).toBe('test-value');
    }
  });
});
