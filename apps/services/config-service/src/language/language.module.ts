import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from './schemas/language.schema';
import { LanguageService } from './services/language.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])],
  providers: [LanguageService],
  controllers: [],
  exports: [LanguageService],
})
export class LanguageModule {}
