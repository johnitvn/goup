import { GrpcOptions } from '@nestjs/microservices';
import { GrpcClientTesting } from './grpc-client-testing';

describe('GrpcClientTesting', () => {
  describe('createGrpcClient', () => {
    it('should throw an error if options are invalid', async () => {
      const options: GrpcOptions['options'] = {
        url: '',
        package: '',
        protoPath: '',
      };

      await expect(GrpcClientTesting.createGrpcClient(options)).rejects.toThrow();
    });
  });
});
