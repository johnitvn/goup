import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { SystemUrl } from '@goup/ng-system-url';
import { Translator, provideTranslator } from '@goup/ng-translator';

export function provideInitializer(siteName: string): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: (translator: Translator, systemUrl: SystemUrl) => {
        return async () => {
          console.log('Application initializing!');
          systemUrl.initialize(siteName);
          try {
            await translator.initialize();
          } catch (error) {
            console.error('Failed to initialize application', error);
          }
        };
      },
      deps: [Translator, SystemUrl],
      multi: true,
    },
    provideTranslator(),
  ];
}
