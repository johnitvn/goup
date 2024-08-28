import { Dict } from '@goup/common-types';
import { config } from '@goup/grpc';
import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

/**
 * Controller for configuration-related endpoints.
 */
@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  /**
   * Retrieves the list of active languages.
   *
   * @returns An observable that emits an array of active languages.
   */
  @Get('active-languages')
  getActiveLanguages(): Observable<config.ActiveLanguage[]> {
    return this.configService.getActiveLanguages();
  }

  /**
   * Retrieves the branding configuration.
   *
   * @returns  An observable that emits the branding configuration response.
   */
  @Get('branding')
  getBranding(): Observable<config.GetBrandingResponse> {
    return this.configService.getBranding();
  }

  /**
   * Retrieves the translations for a specific service, language
   *
   * @param service - The name of the service for which translations are being requested.
   * @param language - The language code for the translations.
   * @returns An Observable that emits an array of dictionaries containing the translations.
   */
  @Get('translations/:service/:language')
  getServiceTranlations(
    @Param('service') service: string,
    @Param('language') language: string
  ): Observable<Dict<string>> {
    return this.configService.getServiceTranlations(service, language);
  }
}
