import { EliteLogger } from '@goup/service-logger';
import { Translator } from '@goup/service-translator';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { LanguageService } from './language/services/language.service';
import { TranslationService } from './translation/services/translation.service.';

@Injectable()
export class AppTranslator extends Translator implements OnModuleInit {
  private defaultLanguageCode: string;
  private translations: { [key: string]: string };

  private readonly logger = new EliteLogger('AppTranslator');

  constructor(readonly translationService: TranslationService, readonly languageService: LanguageService) {
    super();
  }

  async onModuleInit() {
    this.defaultLanguageCode = await this.languageService.getDefaulLanguageCode();
    this.logger.debug('Default language code: %s', this.defaultLanguageCode);
  }

  public translate(
    lang: string,
    key: string,
    defaultValue: string,
    _description?: string,
    interpolateParams?: object
  ): string {
    const result =
      this.translations?.[lang]?.[key] ?? this.translations?.[this.defaultLanguageCode]?.[key] ?? defaultValue;
    return interpolateParams ? this.interpolate(result, interpolateParams) : result;
  }
}
