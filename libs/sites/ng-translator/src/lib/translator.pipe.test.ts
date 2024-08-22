import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslatorPipe } from './translator.pipe';

describe('TranslatorPipe', () => {
  let pipe: TranslatorPipe;
  let translateService: TranslateService;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [ChangeDetectorRef],
    });

    translateService = TestBed.inject(TranslateService);
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);
    pipe = new TranslatorPipe(translateService, changeDetectorRef);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call transform method of TranslatePipe', () => {
    const query = 'test';
    const transformSpy = jest.spyOn(TranslatePipe.prototype, 'transform');
    pipe.transform(query, 'arg1', 'arg2');
    expect(transformSpy).toHaveBeenCalledWith(query);
  });

  it('should return the transformed value', () => {
    const query = 'test';
    const transformedValue = 'translated test';
    jest.spyOn(TranslatePipe.prototype, 'transform').mockReturnValue(transformedValue);
    const result = pipe.transform(query);
    expect(result).toBe(transformedValue);
  });
});
