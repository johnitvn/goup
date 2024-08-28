import { ServiceLogger } from '@goup/service-logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new ServiceLogger('Bootstrap', true, 'GatewayService');
  const app = await NestFactory.create(AppModule, { logger, cors: true });
  await app.listen(3000);
  logger.log(`🚀 Gateway service is running on port 3000`);
}

bootstrap();
