import { config } from '@goup/grpc';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { BrandingService } from '../branding/services/branding.service';
import { LanguageService } from '../language/services/language.service';
import { TranslationService } from '../translation/services/translation.service';
import { AppController } from './app.controller';

jest.mock('@goup/service-logger');
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: LanguageService,
          useValue: {
            findAllActive: jest.fn().mockReturnValue(of([{ id: 1, name: 'English' }])),
          },
        },
        {
          provide: BrandingService,
          useValue: {
            getBranding: jest.fn().mockReturnValue(of({ logo: 'logo.png', theme: 'dark' })),
          },
        },
        {
          provide: TranslationService,
          useValue: {
            getServiceTranlations: jest.fn().mockReturnValue(of({ translations: { key: 'value' } })),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getActiveLanguages', () => {
    it('should return active languages', (done) => {
      appController.getActiveLanguages().subscribe((response) => {
        expect(response).toEqual({ languages: [{ id: 1, name: 'English' }] });
        done();
      });
    });
  });

  describe('getBranding', () => {
    it('should return branding information', (done) => {
      appController.getBranding().subscribe((response) => {
        expect(response).toEqual({ logo: 'logo.png', theme: 'dark' });
        done();
      });
    });
  });

  describe('getServiceTranlations', () => {
    it('should return service translations', (done) => {
      const request: config.GetServiceTranlationsRequest = { service: 'test-service', language: 'en' };
      appController.getServiceTranlations(request).subscribe((response) => {
        expect(response).toEqual({ translations: { key: 'value' } });
        done();
      });
    });
  });
});
