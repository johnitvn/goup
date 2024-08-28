import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { ActiveLanguage, ActiveLanguages } from '../models/active-languages';
import { Branding } from '../models/branding';
import { TranslationLoader } from '../utilities/translation-loader';
import { ActiveLanguageService } from './active-language.service';

@Injectable({ providedIn: 'root' })
export class CommonInitializeService {
  constructor(
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private cookie: SsrCookieService,
    private activeLanguageService: ActiveLanguageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Initializes the common initializer service with the provided domain.
   *
   * This method performs the following actions:
   * - Sets the translation loader domain.
   * - Subscribes to language change events.
   * - Fetches and sets the active languages for the domain.
   * - Fetches and applies branding for the domain.
   *
   * @param domain - The domain to initialize the service with.
   */
  initialize(domain: string): void {
    this.setTranslationLoaderDomain(domain);
    this.subscribeToLanguageChangeEvents();
    this.fetchAndSetActiveLanguages(domain);
    this.fetchAndSetApplyBranding(domain);
  }

  setTranslationLoaderDomain(domain: string): void {
    (this.translateService.currentLoader as TranslationLoader).domain = domain;
  }

  subscribeToLanguageChangeEvents(): void {
    this.translateService.onLangChange.pipe().subscribe(({ lang }) => {
      this.document.documentElement.lang = lang;
    });
  }

  fetchAndSetApplyBranding(domain: string) {
    this.httpClient.get<Branding>(`//api.${domain}/config/branding`).subscribe((branding) => {
      this.translateService.set('branding.company-name', branding.companyName, 'en');
      this.translateService.set('branding.project-name', branding.projectName, 'en');
      this.document.documentElement.style.setProperty('--tui-background-accent-1', branding.primaryColor);
      this.document.documentElement.style.setProperty('--tui-background-accent-1-hover', branding.primaryColorHover);
      this.document.documentElement.style.setProperty(
        '--tui-background-accent-1-pressed',
        branding.primaryColorPressed
      );
      this.document.documentElement.style.setProperty('--tui-background-accent-2', branding.accentColor);
      this.document.documentElement.style.setProperty('--tui-background-accent-2-hover', branding.accentColorHover);
      this.document.documentElement.style.setProperty('--tui-background-accent-2-pressed', branding.accentColorPressed);
    });
  }

  fetchAndSetActiveLanguages(domain: string): void {
    this.httpClient.get<ActiveLanguages>(`//api.${domain}/config/active-languages`).subscribe((activeLanguages) => {
      this.activeLanguageService.setActiveLanguages(activeLanguages);

      const activeLanguageCodes = activeLanguages.map((language: ActiveLanguage) => language.code);
      const defaultConfigLanguage = activeLanguages.find((language: ActiveLanguage) => language.isDefault)?.code;

      const cookieLang = this.cookie.get('lang');
      const browserLang = this.translateService.getBrowserLang();
      const currentLang = cookieLang || browserLang || defaultConfigLanguage || 'en';

      this.translateService.addLangs(activeLanguageCodes);
      this.translateService.use(currentLang);
      this.document.documentElement.lang = currentLang;
    });
  }
}
