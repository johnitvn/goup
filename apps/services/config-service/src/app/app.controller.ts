import { config } from '@goup/grpc';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, map, Observable } from 'rxjs';
import { BrandingService } from '../branding/services/branding.service';
import { LanguageService } from '../language/services/language.service';
import { TranslationService } from '../translation/services/translation.service';

@Controller()
export class AppController implements config.ConfigService {
  constructor(
    private languageService: LanguageService,
    private brandingService: BrandingService,
    private translationService: TranslationService
  ) {}

  @GrpcMethod('ConfigService', 'getActiveLanguages')
  getActiveLanguages(): Observable<config.GetActiveLanguagesResponse> {
    return from(this.languageService.findAllActive()).pipe(map((languages) => ({ languages })));
  }

  @GrpcMethod('ConfigService', 'getBranding')
  getBranding(): Observable<config.GetBrandingResponse> {
    return from(this.brandingService.getBranding());
  }

  @GrpcMethod('ConfigService', 'getServiceTranlations')
  getServiceTranlations(data: config.GetServiceTranlationsRequest): Observable<config.GetServiceTranlationsResponse> {
    return from(this.translationService.getServiceTranlations(data));
  }
}
