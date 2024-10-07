import { TranslatorModule } from '@goup/service-translator';
import { Module } from '@nestjs/common';
import { AppTranslator } from './app.translator';
import { LanguageModule } from './language/language.module';
import { LanguageService } from './language/services/language.service';
import { TranslationService } from './translation/services/translation.service.';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [
    LanguageModule,
    TranslationModule,
    TranslatorModule.registerAsync({
      imports: [TranslationModule, LanguageModule],
      inject: [TranslationService, LanguageService],
      useFactory: async (translationService: TranslationService, languageService: LanguageService) => {
        return {
          translator: new AppTranslator(translationService, languageService),
        };
      },
    }),
  ],
})
export class AppModule {}
