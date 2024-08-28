import { ServiceLogger } from '@goup/service-logger';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new ServiceLogger('Bootstrap', true, 'ConfigService');

  const app = await NestFactory.create(AppModule, { logger });
  app.enableShutdownHooks();

  // gRPC microservice
  app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3001',
        package: 'config',
        protoPath: join(__dirname, './proto/config.proto'),
      },
    },
    { inheritAppConfig: true }
  );

  await app.init();
  await app.startAllMicroservices();

  logger.log(`🚀 Config service running with gRPC on port: 3001`);
}

bootstrap();
