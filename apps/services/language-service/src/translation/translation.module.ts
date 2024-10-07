import { EliteLogger } from '@goup/service-logger';
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { LanguageManagementController } from './controllers/translation-management.controller';
import { Translation, TranslationSchema } from './schemas/translation.schema';
import { TranslationService } from './services/translation.service.';

@Module({
  imports: [MongooseModule.forFeature([{ name: Translation.name, schema: TranslationSchema }])],
  controllers: [LanguageManagementController],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule implements OnModuleInit {
  private logger = new EliteLogger('TranslationModule');

  constructor(private translationService: TranslationService) {}

  async onModuleInit() {
    this.logger.debug('Initializing translation module');
    await this.seedTranslations();
  }

  async seedTranslations() {
    if (existsSync(join(__dirname, 'translations'))) {
      readdirSync(join(__dirname, 'translations')).forEach(async (service) => {
        const tranlationsFile = join(__dirname, 'translations', service, 'translations.json');
        if (existsSync(tranlationsFile)) {
          this.seedTranslationsForService(service, tranlationsFile);
        }
      });
    }
  }

  seedTranslationsForService(service: string, tranlationsFile: string) {
    const translations = JSON.parse(readFileSync(tranlationsFile, 'utf-8'));
    for (const key in translations) {
      this.logger.debug(`Seeding translation for service ${service} and key ${key}`);
    }
  }
}
