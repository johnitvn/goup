import { Dict } from '@goup/common-types';
import { config } from '@goup/grpc';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { ConfigController } from './config.controller';

jest.mock('@goup/service-logger');

describe('ConfigController', () => {
  let configController: ConfigController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            getActiveLanguages: jest.fn(),
            getBranding: jest.fn(),
            getServiceTranlations: jest.fn(),
          },
        },
      ],
    }).compile();

    configController = module.get<ConfigController>(ConfigController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(configController).toBeDefined();
  });

  describe('getActiveLanguages', () => {
    it('should return an array of active languages', (done) => {
      const result: Observable<config.ActiveLanguage[]> = of([{ code: 'en', name: 'English' }]);
      jest.spyOn(configService, 'getActiveLanguages').mockReturnValue(result);

      configController.getActiveLanguages().subscribe((languages) => {
        expect(languages).toEqual([{ code: 'en', name: 'English' }]);
        done();
      });
    });
  });

  describe('getBranding', () => {
    it('should return the branding configuration', (done) => {
      const result: config.GetBrandingResponse = {
        companyName: 'Example Company',
        projectName: 'Example Project',
        primaryColor: '#000000',
        primaryColorHover: '#111111',
        primaryColorPressed: '#111111',
        accentColor: '#222222',
        accentColorHover: '#333333',
        accentColorPressed: '#111111',
      };
      jest.spyOn(configService, 'getBranding').mockReturnValue(of(result));

      configController.getBranding().subscribe((branding) => {
        expect(branding).toEqual(result);
        done();
      });
    });
  });

  describe('getServiceTranlations', () => {
    it('should return an array of translations for the specified service and language', (done) => {
      const result: Dict<string> = { key: 'hello', value: 'Hello' };
      jest.spyOn(configService, 'getServiceTranlations').mockReturnValue(of(result));

      configController.getServiceTranlations('testService', 'en').subscribe((translations) => {
        expect(translations).toEqual(result);
        done();
      });
    });
  });
});
