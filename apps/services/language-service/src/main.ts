import { GrpcServiceBootstrapModule, MongoDBConfigSchema } from '@goup/service-grpc';
import { EliteLoggerService } from '@goup/service-logger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const time = Date.now();
  const logger = new EliteLoggerService();
  logger.log('Starting language microservice', 'Bootstrap');
  const { port } = await GrpcServiceBootstrapModule.create(AppModule, [MongoDBConfigSchema], {
    defaultPort: 3000,
    logger: logger,
    package: ['v1'],
    protoPath: [join(__dirname, './proto/language.proto'), join(__dirname, './proto/translation.proto')],
  });
  logger.log(`Language service started in ${Date.now() - time}ms on port ${port}`, 'Bootstrap');
}

bootstrap();
