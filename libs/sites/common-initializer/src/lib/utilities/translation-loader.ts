import { HttpClient } from '@angular/common/http';
import { Dict } from '@goup/common-types';
import { TranslateLoader } from '@ngx-translate/core';
import { from, Observable, switchMap } from 'rxjs';

/**
 * A custom translation loader that fetches translations from a remote API endpoint.
 */
export class TranslationLoader extends TranslateLoader {
  public domain: string | null = null;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * Fetches translations for the specified language.
   *
   * @param lang - The language code for which to load translations.
   * @returns An Observable that emits a dictionary of translations.
   *
   * If the language is 'en', it loads the default translations from a local JSON file.
   * For other languages, it waits for the domain to be determined and then fetches the translations
   * from a remote API endpoint.
   */
  getTranslation(lang: string): Observable<Dict<string>> {
    if (lang === 'en') {
      return this.httpClient.get<Dict<string>>(`/i18n-default.json`).pipe();
    } else {
      return from(this.waitForDomain()).pipe(
        switchMap((domain) => {
          return this.httpClient.get<Dict<string>>(`//api.${domain}/config/translations/home-site/${lang}`).pipe();
        })
      );
    }
  }

  /**
   * Waits for the domain to be available.
   *
   * This method returns a promise that resolves with the domain if it is already available.
   * If the domain is not available, it will recursively check every 100 milliseconds until the domain is available.
   *
   * @returns A promise that resolves with the domain.
   */
  async waitForDomain(): Promise<string> {
    return new Promise((resolve) => {
      if (this.domain) {
        resolve(this.domain);
      } else {
        setTimeout(() => {
          resolve(this.waitForDomain());
        }, 100);
      }
    });
  }
}
