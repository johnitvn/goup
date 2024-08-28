import { HttpClient } from '@angular/common/http';
import { Dict } from '@goup/common-types';
import { of } from 'rxjs';
import { TranslationLoader } from './translation-loader';

describe('TranslationLoader', () => {
  let httpClient: HttpClient;
  let translationLoader: TranslationLoader;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    } as any as HttpClient;
    translationLoader = new TranslationLoader(httpClient);
  });

  it('should load default translations for English', (done) => {
    const mockTranslations: Dict<string> = { hello: 'Hello' };
    (httpClient.get as jest.Mock).mockReturnValue(of(mockTranslations));

    translationLoader.getTranslation('en').subscribe((translations) => {
      expect(translations).toEqual(mockTranslations);
      expect(httpClient.get).toHaveBeenCalledWith('/i18n-default.json');
      done();
    });
  });

  it('should load translations for other languages from remote API', (done) => {
    const mockTranslations: Dict<string> = { hola: 'Hola' };
    (httpClient.get as jest.Mock).mockReturnValue(of(mockTranslations));
    translationLoader.domain = 'example.com';

    translationLoader.getTranslation('es').subscribe((translations) => {
      expect(translations).toEqual(mockTranslations);
      expect(httpClient.get).toHaveBeenCalledWith('//api.example.com/config/translations/home-site/es');
      done();
    });
  });

  it('should wait for domain to be available before fetching translations', (done) => {
    const mockTranslations: Dict<string> = { bonjour: 'Bonjour' };
    (httpClient.get as jest.Mock).mockReturnValue(of(mockTranslations));
    translationLoader.domain = null;

    jest.spyOn(translationLoader, 'waitForDomain').mockResolvedValue('example.com');

    translationLoader.getTranslation('fr').subscribe((translations) => {
      expect(translations).toEqual(mockTranslations);
      expect(httpClient.get).toHaveBeenCalledWith('//api.example.com/config/translations/home-site/fr');
      done();
    });

    setTimeout(() => {
      translationLoader.domain = 'example.com';
    }, 50);
  });

  it('should resolve waitForDomain immediately if domain is available', async () => {
    translationLoader.domain = 'example.com';
    const domain = await translationLoader.waitForDomain();
    expect(domain).toBe('example.com');
  });

  it('should wait for domain to be set', async () => {
    translationLoader.domain = null;
    setTimeout(() => {
      translationLoader.domain = 'example.com';
    }, 150);

    const domain = await translationLoader.waitForDomain();
    expect(domain).toBe('example.com');
  });
});
