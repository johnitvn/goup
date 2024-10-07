import { v1 } from '@goup/service-protobuf';
import { EliteLogger } from '@goup/service-logger';
import { Module, OnModuleInit } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TranslationModule } from '../translation/translation.module';
import { ActiveLanguageController } from './controllers/active-language.controller';
import { LanguageManagementController } from './controllers/language-management.controller';
import { Language, LanguageSchema } from './schemas/language.schema';
import { LanguageService } from './services/language.service';

const LANGUAGES = [
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Shqip' },
  { code: 'ar', name: 'العربية' },
  { code: 'hy', name: 'Հայերեն' },
  { code: 'az', name: 'Azərbaycan' },
  { code: 'eu', name: 'Euskara' },
  { code: 'be', name: 'Беларуская' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'bs', name: 'Bosanski' },
  { code: 'ca', name: 'Català' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'cs', name: 'Čeština' },
  { code: 'da', name: 'Dansk' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Eesti' },
  { code: 'tl', name: 'Filipino' },
  { code: 'fi', name: 'Suomi' },
  { code: 'fr', name: 'Français' },
  { code: 'gl', name: 'Galego' },
  { code: 'ka', name: 'ქართული' },
  { code: 'de', name: 'Deutsch' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'ht', name: 'Kreyòl ayisyen' },
  { code: 'ha', name: 'Hausa' },
  { code: 'he', name: 'עברית' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'hu', name: 'Magyar' },
  { code: 'is', name: 'Íslenska' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'jw', name: 'Jawa' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'kk', name: 'Қазақ' },
  { code: 'km', name: 'ខ្មែរ' },
  { code: 'ko', name: '한국어' },
  { code: 'ku', name: 'Kurdî' },
  { code: 'ky', name: 'Кыргыз' },
  { code: 'lo', name: 'ລາວ' },
  { code: 'la', name: 'Latina' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'lb', name: 'Lëtzebuergesch' },
  { code: 'mk', name: 'Македонски' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'mt', name: 'Malti' },
  { code: 'mi', name: 'Māori' },
  { code: 'mr', name: 'मराठी' },
  { code: 'mn', name: 'Монгол' },
  { code: 'my', name: 'မြန်မာ' },
  { code: 'ne', name: 'नेपाली' },
  { code: 'no', name: 'Norsk' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ps', name: 'پښتو' },
  { code: 'fa', name: 'فارسی' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ro', name: 'Română' },
  { code: 'ru', name: 'Русский' },
  { code: 'sr', name: 'Српски' },
  { code: 'si', name: 'සිංහල' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'so', name: 'Soomaaliga' },
  { code: 'es', name: 'Español' },
  { code: 'su', name: 'Sunda' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'sv', name: 'Svenska' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'th', name: 'ไทย' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'uk', name: 'Українська' },
  { code: 'ur', name: 'اردو' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'cy', name: 'Cymraeg' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'yi', name: 'יידיש' },
  { code: 'zu', name: 'isiZulu' },
];

@Module({
  imports: [TranslationModule, MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])],
  controllers: [ActiveLanguageController, LanguageManagementController],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule implements OnModuleInit {
  private logger = new EliteLogger(LanguageModule.name);

  constructor(@InjectModel(Language.name) private languageModel: Model<Language>) {}

  async onModuleInit() {
    this.logger.debug('Initializing language module');
    this.logger.debug('Ensuring indexes for language model');
    await this.languageModel.ensureIndexes();

    this.logger.debug('Checking system languages');
    const count = await this.languageModel.countDocuments();
    this.logger.debug('Total system languages %s', count);
    if (count == 0) {
      this.logger.debug('No language found, seeding default languages');
      await this.seedingLanguages();
    }
  }

  async seedingLanguages() {
    this.logger.info('Seeding default languages');
    const mainSupportLanguages = [
      {
        code: 'en',
        name: 'English',
        isDefault: true,
        status: v1.LanguageStatus.ACTIVE,
      },
      {
        code: 'vi',
        name: 'Tiếng Việt',
        isDefault: false,
        status: v1.LanguageStatus.ACTIVE,
      },
    ];
    const otherLanguages = LANGUAGES.filter((language) => language.code !== 'en' && language.code !== 'vi').map(
      ({ code, name }) => ({ code, name, isDefault: false, status: v1.LanguageStatus.INACTIVE })
    );
    this.logger.debug('Inserting languages');
    await this.languageModel.insertMany([...mainSupportLanguages, ...otherLanguages]);
    this.logger.info('Seeding default languages completed');
  }
}
