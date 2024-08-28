import { TestBed } from '@angular/core/testing';
import { ActiveLanguages } from '../models/active-languages';
import { ActiveLanguageService } from './active-language.service';

describe('ActiveLanguageService', () => {
  let service: ActiveLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set active languages', () => {
    const languages: ActiveLanguages = [
      { code: 'en', title: 'English', isDefault: true },
      { code: 'vi', title: 'Tiếng Việt', isDefault: false },
    ];
    service.setActiveLanguages(languages);
    service.getActiveLanguages().subscribe((activeLanguages) => {
      expect(activeLanguages).toEqual(languages);
    });
  });

  it('should get active languages as an observable', (done) => {
    const languages: ActiveLanguages = [
      { code: 'en', title: 'English', isDefault: true },
      { code: 'vi', title: 'Tiếng Việt', isDefault: false },
    ];
    service.setActiveLanguages(languages);
    service.getActiveLanguages().subscribe((activeLanguages) => {
      expect(activeLanguages).toEqual(languages);
      done();
    });
  });

  it('should update active languages', (done) => {
    const initialLanguages: ActiveLanguages = [{ code: 'en', title: 'English', isDefault: true }];
    const updatedLanguages: ActiveLanguages = [
      { code: 'en', title: 'English', isDefault: true },
      { code: 'vi', title: 'Tiếng Việt', isDefault: false },
    ];
    service.setActiveLanguages(initialLanguages);
    service.setActiveLanguages(updatedLanguages);
    service.getActiveLanguages().subscribe((activeLanguages) => {
      expect(activeLanguages).toEqual(updatedLanguages);
      done();
    });
  });
});
