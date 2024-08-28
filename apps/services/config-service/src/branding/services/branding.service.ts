import { ServiceLogger } from '@goup/service-logger';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branding } from '../schemas/theme.schema';

/**
 * Service responsible for managing branding data.
 * Implements the `OnApplicationBootstrap` interface to seed default branding data on application startup.
 */
@Injectable()
export class BrandingService implements OnApplicationBootstrap {
  private logger = new ServiceLogger(BrandingService.name);

  /**
   * Constructs a new instance of the BrandingService.
   *
   * @param brandingModel - The model representing the Branding entity, injected by the NestJS framework.
   */
  constructor(@InjectModel(Branding.name) private readonly brandingModel: Model<Branding>) {}

  /**
   * Lifecycle hook that is called when the application has fully started.
   * This method seeds the default branding data into the system.
   *
   * @returns A promise that resolves when the seeding is complete.
   */
  async onApplicationBootstrap(): Promise<void> {
    await this.seedDefaultBranding();
  }

  /**
   * Seeds the default branding data into the database if no branding documents exist.
   *
   * This method checks if the branding collection is empty. If it is, it inserts a new document
   * with default branding values such as project name, company name, and various color settings.
   *
   * @returns A promise that resolves when the seeding operation is complete.
   */
  async seedDefaultBranding(): Promise<void> {
    if ((await this.brandingModel.countDocuments()) === 0) {
      this.logger.info('Seeding default branding data');
      await this.brandingModel.create({
        projectName: 'Goup',
        companyName: 'Goup CO.,LTD',
        primaryColor: '#526ed3',
        primaryColorHover: '#6c86e2',
        primaryColorPressed: '#314692',
        accentColor: '#ff7043',
        accentColorHover: '#ff9a94',
        accentColorPressed: '#e7716a',
      });
    }
  }

  /**
   * Retrieves the branding data from the database.
   *
   * @returns A promise that resolves to the branding data.
   * @throws If branding data is not found.
   */
  async getBranding(): Promise<Branding> {
    const branding = await this.brandingModel.findOne().exec();
    if (branding) {
      return branding;
    } else {
      throw new Error('Branding data not found');
    }
  }
}
