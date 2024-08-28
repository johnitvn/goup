import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TranslatePipeStandalone } from './translate.pipe';

describe('TranslatePipeStandalone', () => {
  let pipe: TranslatePipeStandalone;
  let translateService: TranslateService;

  beforeEach(() => {
    const translateServiceMock = {
      get: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [TranslatePipeStandalone, { provide: TranslateService, useValue: translateServiceMock }],
    });

    pipe = TestBed.inject(TranslatePipeStandalone);
    translateService = TestBed.inject(TranslateService);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should translate the value', () => {
    const value = 'hello';
    const translatedValue = 'hola';
    (translateService.get as jest.Mock).mockReturnValue(of(translatedValue));

    const result = pipe.transform(value);

    expect(translateService.get).toHaveBeenCalledWith(value);
    expect(result).toBe(translatedValue);
  });

  it('should return empty string if translation is not available', () => {
    const value = 'unknown';
    (translateService.get as jest.Mock).mockReturnValue(of(''));

    const result = pipe.transform(value);

    expect(translateService.get).toHaveBeenCalledWith(value);
    expect(result).toBe('');
  });
});
