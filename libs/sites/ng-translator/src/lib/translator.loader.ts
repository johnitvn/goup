import { HttpClient } from '@angular/common/http';
import { Dict } from '@goup/common-types';
import { SystemUrl } from '@goup/ng-system-url';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
export class TranslatorLoader extends TranslateLoader {
  constructor(private httpClient: HttpClient, private systemUrl: SystemUrl) {
    super();
  }

  getTranslation(lang: string): Observable<Dict<string>> {
    console.debug('Fetching translations for language:', lang);
    return this.httpClient
      .get<Dict<string>>(this.systemUrl.assetLink(`/language/${this.systemUrl.siteName}/${lang}.json`))
      .pipe(tap((translations) => console.debug('Fetched translations:', translations)));
  }
}
