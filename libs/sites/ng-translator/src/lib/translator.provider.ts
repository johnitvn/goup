import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, importProvidersFrom, Provider } from '@angular/core';
import { SystemUrl } from '@goup/ng-system-url';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatorLoader } from './translator.loader';

export function provideTranslator(): Provider | EnvironmentProviders {
  return importProvidersFrom([
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslatorLoader, deps: [HttpClient, SystemUrl] },
      extend: true,
    }),
  ]);
}
