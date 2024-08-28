import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import { BrandingModule } from '../branding/branding.module';
import { LanguageModule } from '../language/language.module';
import { TranslationModule } from '../translation/translation.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      ignoreEnvFile: true,
      cache: true,
      load: [
        () => ({
          mongo: process.env.MONGO_URI,
        }),
      ],
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo'),
      }),
      inject: [ConfigService],
    }),
    BrandingModule,
    LanguageModule,
    TranslationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
