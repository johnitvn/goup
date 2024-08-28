import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { ConfigController } from './controllers/config.controller';
import { ConfigService } from './services/config.service';

/**
 * The ConfigModule is responsible for configuring the gRPC client for the CONFIG_SERVICE.
 *
 * @module ConfigModule
 *
 * @description
 * This module imports the ClientsModule and registers the CONFIG_SERVICE with gRPC transport.
 * The gRPC client connects to the service at '127.0.0.1:3002' and uses the 'config' package
 * with the proto definition located at 'proto/config.proto'.
 *
 * @imports
 * - ClientsModule: Registers the gRPC client for CONFIG_SERVICE.
 *
 * @controllers
 * - ConfigController: Handles incoming requests and interacts with the ConfigService.
 *
 * @providers
 * - ConfigService: Provides the business logic for the configuration service.
 */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONFIG_SERVICE',
        transport: Transport.GRPC,
        options: { url: '127.0.0.1:3001', package: 'config', protoPath: join(__dirname, 'proto/config.proto') },
      },
    ]),
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
