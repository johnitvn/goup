import { Dict } from '@goup/common-types';
import { config } from '@goup/grpc';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

/**
 * Service to manage configuration settings and retrieve language-related data.
 *
 * @class
 * @implements {OnModuleInit}
 */
@Injectable()
export class ConfigService implements OnModuleInit {
  private languageService: config.ConfigService;

  /**
   * Constructs an instance of the ConfigService.
   *
   * @param {ClientGrpc} languageServiceClient - The gRPC client for the language service, injected with the token 'CONFIG_SERVICE'.
   */
  constructor(@Inject('CONFIG_SERVICE') private languageServiceClient: ClientGrpc) {}

  /**
   * Initializes the module by setting up the language service.
   * This method is called when the module is initialized.
   * It retrieves the `ConfigService` from the `languageServiceClient` and assigns it to `languageService`.
   */
  onModuleInit() {
    this.languageService = this.languageServiceClient.getService<config.ConfigService>('ConfigService');
  }

  /**
   * Retrieves the list of active languages.
   *
   * @returns An observable that emits an array of active languages.
   */
  getActiveLanguages(): Observable<config.ActiveLanguage[]> {
    return this.languageService.getActiveLanguages({}).pipe(map(({ languages }) => languages));
  }

  /**
   * Retrieves translations for a specific service in a given language.
   *
   * @param service - The name of the service for which translations are requested.
   * @param language - The language code for the desired translations.
   * @returns An Observable that emits an array of dictionaries containing the translations.
   */
  getServiceTranlations(service: string, language: string): Observable<Dict<string>> {
    return this.languageService.getServiceTranlations({ service, language }).pipe(
      map(({ translations }) => {
        if (translations) {
          const result: Dict<string> = {};
          translations.forEach(({ key, value }) => {
            result[key] = value;
          });
          return result;
        } else {
          return {};
        }
      })
    );
  }

  /**
   * Retrieves the branding configuration.
   *
   * @returns An observable that emits the branding configuration response.
   */
  getBranding(): Observable<config.GetBrandingResponse> {
    return this.languageService.getBranding({});
  }
}
