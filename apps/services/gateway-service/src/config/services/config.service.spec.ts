import { config } from '@goup/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ConfigService } from './config.service';

jest.mock('@goup/service-logger');

describe('ConfigService', () => {
  let service: ConfigService;
  let clientGrpcMock: Partial<ClientGrpc>;
  let configServiceMock: Partial<config.ConfigService>;

  beforeEach(async () => {
    configServiceMock = {
      getActiveLanguages: jest.fn().mockReturnValue(of({ languages: [{ code: 'en', name: 'English' }] })),
      getServiceTranlations: jest.fn().mockReturnValue(of({ translations: [{ key: 'hello', value: 'Hello' }] })),
      getBranding: jest.fn().mockReturnValue(of({ branding: 'Branding Info' })),
    };

    clientGrpcMock = {
      getService: jest.fn().mockReturnValue(configServiceMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, { provide: 'CONFIG_SERVICE', useValue: clientGrpcMock }],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getActiveLanguages', () => {
    it('should return an array of active languages', (done) => {
      service.getActiveLanguages().subscribe((languages) => {
        expect(languages).toEqual([{ code: 'en', name: 'English' }]);
        done();
      });
    });
  });

  describe('getServiceTranlations', () => {
    it('should return an array of translations for a specific service and language', (done) => {
      service.getServiceTranlations('testService', 'en').subscribe((translations) => {
        expect(translations).toEqual({ hello: 'Hello' });
        done();
      });
    });
  });

  describe('getBranding', () => {
    it('should return the branding configuration', (done) => {
      service.getBranding().subscribe((branding) => {
        expect(branding).toEqual({ branding: 'Branding Info' });
        done();
      });
    });
  });
});
