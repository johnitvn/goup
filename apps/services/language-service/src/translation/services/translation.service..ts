import { CRUD } from '@goup/service-crud';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Translation } from '../schemas/translation.schema';

@Injectable()
export class TranslationService {
  private crud: CRUD<Translation>;

  constructor(@InjectModel(Translation.name) private translationModel: Model<Translation>) {
    this.crud = new CRUD<Translation>(translationModel);
  }

  async shouldPendingActiveLanguage(languageCode: string): Promise<boolean> {
    return true;
  }
}
