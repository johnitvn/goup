import { config } from '@goup/grpc';
import { ServiceLogger } from '@goup/service-logger';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { BrandingService } from '../../branding/services/branding.service';
import { LanguageService } from '../../language/services/language.service';
import { Translation } from '../schemas/translation.schema';

/**
 * Service responsible for handling translation-related operations.
 * Implements the `OnApplicationBootstrap` interface to perform actions after the application has been initialized.
 */
@Injectable()
export class TranslationService implements OnApplicationBootstrap {
  private logger = new ServiceLogger(TranslationService.name);

  /**
   * Constructs a new instance of the TranslationService.
   *
   * @param translationModel - The injected model for handling translation data.
   * @param languageService - The service for managing language-related operations.
   * @param brandingService - The service for managing branding-related operations.
   */
  constructor(
    @InjectModel(Translation.name) private readonly translationModel: Model<Translation>,
    private readonly brandingService: BrandingService,
    private readonly languageService: LanguageService
  ) {}

  /**
   * Lifecycle hook that is called after the application has been initialized.
   * This method seeds the translations by calling the `seedTranslations` method.
   *
   * @returns A promise that resolves when the seeding is complete.
   */
  async onApplicationBootstrap(): Promise<void> {
    await this.seedTranslations();
  }

  /**
   * Seeds the translations in the database.
   */
  /**
   * Seeds the translations in the database.
   */
  async seedTranslations(): Promise<void> {
    // this.logger.info('Seeding translations...');

    const translationDir = join(__dirname, 'translation');
    if (!existsSync(translationDir)) {
      // this.logger.info('No translation files found.');
      return;
    }

    const services = readdirSync(translationDir);
    // this.logger.debug(`Found services: ${services.join(', ')}`);

    for (const service of services) {
      await this.seedServiceTranslations(service, translationDir);
    }
  }

  /**
   * Seeds translations for a specific service.
   *
   * @param {string} service - The service identifier.
   * @param {string} translationDir - The directory containing translation files.
   */
  async seedServiceTranslations(service: string, translationDir: string): Promise<void> {
    this.logger.debug(`Seeding translations for service: ${service}`);

    const translationKeysPath = join(translationDir, service, 'i18n-default.json');
    let translations = JSON.parse(readFileSync(translationKeysPath, 'utf-8'));
    this.logger.verbose(`Found ${Object.keys(translations).length} translation keys for service: ${service}`);

    const { companyName, projectName } = await this.brandingService.getBranding();
    translations = { ...translations, 'branding.company-name': companyName, 'branding.project-name': projectName };

    const languages = await this.languageService.findAll();
    for (const language of languages) {
      await this.seedLanguageTranslations(language.code, service, translations);
    }
  }

  /**
   * Seeds translations for a specific language and service.
   *
   * @param {string} code - The language code.
   * @param {string} service - The service identifier.
   * @param {Record<string, string>} translations - The translations object.
   */
  async seedLanguageTranslations(code: string, service: string, translations: Record<string, string>): Promise<void> {
    this.logger.verbose(`Seeding translations for language: ${code}`);

    for (const key of Object.keys(translations)) {
      const translation = await this.translationModel.findOne({ code, service, key }).exec();
      const value = code === 'en' ? translations[key] : '';

      if (translation) {
        if (code === 'en') {
          translation.value = value;
          await translation.save();
        }
      } else {
        await this.translationModel.create({ code, service, key, value });
      }
    }
  }

  /**
   * Retrieves service translations based on the provided language and service.
   *
   * @param {config.GetServiceTranlationsRequest} params - The request object containing language and service.
   * @param {string} params.language - The language code for the translations.
   * @param {string} params.service - The service identifier for the translations.
   * @returns A promise that resolves to the service translations response.
   */
  async getServiceTranlations({
    language,
    service,
  }: config.GetServiceTranlationsRequest): Promise<config.GetServiceTranlationsResponse> {
    const translations = await this.translationModel.find({ code: language, service, value: { $ne: '' } }).exec();
    if (translations.length > 0) {
      return {
        translations: translations.map((translation) => ({ key: translation.key, value: translation.value })),
      };
    } else {
      return { translations: [] } as config.GetServiceTranlationsResponse;
    }
  }
}
