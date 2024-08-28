import { ServiceLogger } from '@goup/service-logger';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from '../schemas/language.schema';

/**
 * Service responsible for managing languages within the application.
 * Implements the `OnApplicationBootstrap` interface to seed initial data on application startup.
 */
@Injectable()
export class LanguageService implements OnApplicationBootstrap {
  private logger = new ServiceLogger(LanguageService.name);

  /**
   * Constructs a new instance of the LanguageService.
   *
   * @param {Model<Language>} languageModel - The injected model for the Language entity.
   */
  constructor(@InjectModel(Language.name) private readonly languageModel: Model<Language>) {}

  /**
   * Lifecycle hook that is called after the application has been initialized.
   * This method seeds the initial set of languages into the application.
   *
   * @returns A promise that resolves when the seeding is complete.
   */
  async onApplicationBootstrap(): Promise<void> {
    await this.seedLanguages();
  }

  /**
   * Seeds the database with the default language if no languages are present.
   */
  async seedLanguages() {
    if ((await this.languageModel.countDocuments()) === 0) {
      this.logger.info('Seeding default support english language');
      await this.languageModel.create({ code: 'en', title: 'English', isDefault: true, isActive: true });
      await this.languageModel.create({ code: 'vi', title: 'Tiếng Việt', isDefault: false, isActive: true });
    }
  }
  /**
   * Retrieves all language documents from the database.
   *
   * @returns A promise that resolves to an array of Language objects.
   */
  async findAll(): Promise<Language[]> {
    return this.languageModel.find().exec();
  }

  /**
   * Retrieves all active language documents from the database.
   *
   * @returns A promise that resolves to an array of Language objects.
   */
  async findAllActive(): Promise<Language[]> {
    return this.languageModel.find({ isActive: true }).exec();
  }
}
