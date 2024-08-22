import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Optional } from '@goup/common-types';
import { SystemUrl } from '@goup/ng-system-url';
import { WA_WINDOW } from '@ng-web-apis/common';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  title: string;
  isDefault: boolean;
}

export type Languages = Language[];

@Injectable({ providedIn: 'root' })
export class Translator {
  private languagesSubject = new BehaviorSubject<Languages>([]);

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(WA_WINDOW) private window: Window,
    private cookie: SsrCookieService,
    private http: HttpClient,
    private translateService: TranslateService,
    private systemUrl: SystemUrl
  ) {}

  public async initialize(): Promise<void> {
    console.debug('Initializing translator');
    if (isPlatformBrowser(this.platformId)) {
      this.subcribeToLangChange();
      this.featActiveLanguages();
    } else {
      await this.subcribeToLangChange();
      await this.featActiveLanguages();
    }
  }

  private async subcribeToLangChange(): Promise<void> {
    this.translateService.onLangChange.subscribe(({ lang }) => {
      console.debug('Language changed to:', lang);
      this.window.document.documentElement.lang = lang;
    });
  }

  private featActiveLanguages() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Language[]>(this.systemUrl.assetLink('/language/supported-languages.json')).subscribe({
        next: (languages) => {
          console.debug('Active languages fetched', languages);
          this.languagesSubject.next(languages);
          const activeLanguageCodes = languages.map((language) => language.code);
          const defaultConfigLanguage = languages.find((language) => language.isDefault)?.code;

          const getValidLanguage = (lang: Optional<string>) =>
            lang && activeLanguageCodes.includes(lang) ? lang : undefined;

          const cookieLang = getValidLanguage(this.cookie.get('lang'));
          const browserLang = getValidLanguage(this.translateService.getBrowserLang());

          const currentLang = cookieLang || browserLang || defaultConfigLanguage || activeLanguageCodes[0];

          this.translateService.addLangs(activeLanguageCodes);
          this.translateService.use(currentLang);
          resolve();
        },
        error: (error) => {
          console.error('Error fetching active languages', error);
          reject(error);
        },
      });
    });
  }

  translate(
    key: string,
    _defaultValue?: string,
    _description?: string,
    interpolateParams?: object
  ): Observable<string> {
    return this.translateService.get(key, interpolateParams);
  }

  instant(key: string, _defaultValue?: string, _description?: string, interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams);
  }

  setCurrentLanguage(language: string): void {
    this.translateService.use(language);
  }
}
