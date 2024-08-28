import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandingModule } from '../branding/branding.module';
import { LanguageModule } from '../language/language.module';
import { Translation, TranslationSchema } from './schemas/translation.schema';
import { TranslationService } from './services/translation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Translation.name, schema: TranslationSchema }]),
    LanguageModule,
    BrandingModule,
  ],
  controllers: [],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
