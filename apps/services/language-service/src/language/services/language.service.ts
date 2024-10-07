import { CRUD } from '@goup/service-crud';
import { GrpcInvalidArgumentException, GrpcUnavailableException } from '@goup/service-grpc-exceptions';
import { EliteLogger } from '@goup/service-logger';
import { v1 } from '@goup/service-protobuf';
import { TranslatorContext } from '@goup/service-translator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TranslationService } from '../../translation/services/translation.service.';
import { Language } from '../schemas/language.schema';

@Injectable()
export class LanguageService {
  private logger = new EliteLogger(LanguageService.name);
  crud: CRUD<Language>;

  constructor(
    @InjectModel(Language.name) private languageModel: Model<Language>,
    private translationService: TranslationService
  ) {
    this.crud = new CRUD<Language>(languageModel);
  }

  async getDefaulLanguageCode(): Promise<string> {
    const { code } = await this.languageModel.findOne({ isDefault: true });
    return code;
  }

  async getActiveLanguages(): Promise<Language[]> {
    this.logger.debug('Getting active languages');
    try {
      return this.crud.list({
        filters: [{ field: 'status', operator: v1.FilterOperator.EQUAL, numberValue: v1.LanguageStatus.ACTIVE }],
      });
    } catch (error) {
      this.handleConnectionErrror(error);
      throw error;
    }
  }

  async getLanguages(listing: v1.Listing): Promise<Language[]> {
    try {
      this.logger.debug('Getting languages');
      return this.crud.list(listing);
    } catch (error) {
      this.handleConnectionErrror(error);
      throw error;
    }
  }

  async updateLanguages({ ids, language }: v1.UpdateLanguageRequest): Promise<Language[]> {
    if (ids.length === 0) return [];

    if (ids.length > 1 && language.isDefault === true) {
      const translatorContext = TranslatorContext.current();
      const message = translatorContext.translate(
        'error.only-one-language-can-be-default',
        'Only one language can be default',
        'Message display for user when they try to set multiple languages as default'
      );
      throw new GrpcInvalidArgumentException('Only one language can be default', { message });
    }

    try {
      if (language.isDefault === true) {
        await this.crud.update([], { isDefault: false });
      }

      if (language.status === v1.LanguageStatus.ACTIVE) {
        const languages = await this.languageModel.find({ _id: { $in: ids } });
        const shouldPendingActiveIds: Array<string> = [];
        const shouldActiveIds: Array<string> = [];

        for (const language of languages) {
          const shouldPendingActive = await this.translationService.shouldPendingActiveLanguage(language.code);
          if (shouldPendingActive) {
            shouldPendingActiveIds.push(language._id);
          } else {
            shouldActiveIds.push(language._id);
          }
        }
        await this.languageModel.updateMany(
          { _id: { $in: shouldPendingActiveIds } },
          { status: v1.LanguageStatus.PENDING_ACTIVE }
        );
        await this.languageModel.updateMany({ _id: { $in: shouldActiveIds } }, { status: v1.LanguageStatus.ACTIVE });
      } else {
        await this.languageModel.updateMany({ _id: { $in: ids } }, language);
      }
      return await this.languageModel.find({ _id: { $in: ids } });
    } catch (error) {
      this.handleConnectionErrror(error);
      throw error;
    }
  }

  private handleConnectionErrror(error) {
    if (error.code === 10061 || error.code === 10058 || error.code === 18) {
      throw new GrpcUnavailableException(
        'We are having trouble connecting to the database. Our technical team is working to resolve this issue. Please try again in approximately 5 minutes. Thank you for your patience!'
      );
    }
  }
}
