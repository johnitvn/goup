import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import {
  APP_INITIALIZER,
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UNIVERSAL_PROVIDERS } from '@ng-web-apis/universal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { CommonInitializeService } from './services/common-intializer.service';
import { TranslationLoader } from './utilities/translation-loader';

/**
 * Provides a common initializer for the application.
 *
 * This function returns an array of providers and environment providers that are used to initialize
 * the application with common settings and services.
 *
 * @param domain - The domain to be used during initialization.
 * @returns An array of providers and environment providers.
 *
 * The returned array includes:
 * - An `APP_INITIALIZER` provider that uses a factory function to initialize the `CommonInitializeService` with the given domain.
 * - Providers imported from `TranslateModule` configured with a default language of 'en' and a custom `TranslateLoader`.
 * - Providers for animations, HTTP client with fetch support, and zone change detection with event coalescing.
 * - Additional event plugins and universal providers.
 */
export function provideCommonInitializer(domain: string): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: (intializerService: CommonInitializeService) => {
        return () => {
          intializerService.initialize(domain);
        };
      },
      multi: true,
      deps: [CommonInitializeService],
    },
    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: { provide: TranslateLoader, useClass: TranslationLoader, deps: [HttpClient] },
        extend: true,
      }),
    ]),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    NG_EVENT_PLUGINS,
    UNIVERSAL_PROVIDERS,
  ];
}
