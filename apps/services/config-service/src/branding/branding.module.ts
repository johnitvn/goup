import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageModule } from '../language/language.module';
import { Branding, BrandingSchema } from './schemas/theme.schema';
import { BrandingService } from './services/branding.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: Branding.name, schema: BrandingSchema }]), LanguageModule],
  controllers: [],
  providers: [BrandingService],
  exports: [BrandingService],
})
export class BrandingModule {}
