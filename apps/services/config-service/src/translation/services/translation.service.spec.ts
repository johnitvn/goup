import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { BrandingService } from '../../branding/services/branding.service';
import { LanguageService } from '../../language/services/language.service';
import { Translation } from '../schemas/translation.schema';
import { TranslationService } from './translation.service';

jest.mock('fs');
jest.mock('@goup/service-logger');

describe('TranslationService', () => {
  let service: TranslationService;

  const MockTranslationModel = {
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslationService,
        {
          provide: getModelToken(Translation.name),
          useValue: MockTranslationModel,
        },
        {
          provide: BrandingService,
          useValue: {
            getBranding: jest.fn().mockResolvedValue({ companyName: 'TestCompany', projectName: 'TestProject' }),
          },
        },
        {
          provide: LanguageService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ code: 'en' }, { code: 'es' }]),
          },
        },
      ],
    }).compile();

    service = module.get<TranslationService>(TranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onApplicationBootstrap', () => {
    it('should call seedTranslations', async () => {
      jest.spyOn(service, 'seedTranslations').mockImplementation(async () => {
        return;
      });
      await service.onApplicationBootstrap();
      expect(service.seedTranslations).toHaveBeenCalled();
    });
  });

  describe('seedTranslations', () => {
    it('should not seed if translation directory does not exist', async () => {
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      await service.seedTranslations();
      expect(existsSyncMock).toHaveBeenCalledWith(expect.any(String));
    });

    it('should seed translations if translation directory exists', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fs, 'readdirSync').mockImplementation(() => ['service1'] as any);
      const seedServiceTranslationsMock = jest
        .spyOn(service, 'seedServiceTranslations')
        .mockImplementation(async () => {
          return;
        });

      await service.seedTranslations();
      expect(seedServiceTranslationsMock).toHaveBeenCalledWith('service1', expect.any(String));
    });
  });

  describe('seedServiceTranslations', () => {
    it('should seed translations for a specific service', async () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({ key1: 'value1' }));
      const seedLanguageTranslationsMock = jest
        .spyOn(service, 'seedLanguageTranslations')
        .mockImplementation(async () => {
          return;
        });

      await service.seedServiceTranslations('service1', 'translationDir');
      expect(seedLanguageTranslationsMock).toHaveBeenCalledWith('en', 'service1', expect.any(Object));
      expect(seedLanguageTranslationsMock).toHaveBeenCalledWith('es', 'service1', expect.any(Object));
    });
  });

  describe('seedLanguageTranslations', () => {
    it('should seed translations if not exits for a specific language but not en', async () => {
      jest.spyOn(MockTranslationModel, 'findOne').mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      jest.spyOn(MockTranslationModel, 'create').mockReturnValue({});

      await service.seedLanguageTranslations('vi', 'service1', { key1: 'value1' });
      expect(MockTranslationModel.findOne).toHaveBeenCalledWith({
        code: 'vi',
        service: 'service1',
        key: 'key1',
      });
      expect(MockTranslationModel.create).toHaveBeenCalledWith({
        code: 'vi',
        service: 'service1',
        key: 'key1',
        value: '',
      });
    });

    it('should seed translations if not exits for a en language', async () => {
      jest.spyOn(MockTranslationModel, 'findOne').mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      jest.spyOn(MockTranslationModel, 'create').mockReturnValue({});

      await service.seedLanguageTranslations('en', 'service1', { key1: 'value1' });
      expect(MockTranslationModel.findOne).toHaveBeenCalledWith({
        code: 'en',
        service: 'service1',
        key: 'key1',
      });
      expect(MockTranslationModel.create).toHaveBeenCalledWith({
        code: 'en',
        service: 'service1',
        key: 'key1',
        value: 'value1',
      });
    });

    it('should update translations value if exits and is en language', async () => {
      const saveMock = jest.fn();
      const execMock = jest.fn().mockResolvedValue({ value: 'oldValue', save: saveMock });
      jest.spyOn(MockTranslationModel, 'findOne').mockReturnValue({ exec: execMock });
      await service.seedLanguageTranslations('en', 'service1', { key1: 'value1' });
      expect(MockTranslationModel.findOne).toHaveBeenCalledWith({
        code: 'en',
        service: 'service1',
        key: 'key1',
      });
      expect(saveMock).toHaveBeenCalled();
      expect((await execMock.mock.results[0].value).value).toBe('value1');
    });

    it('should not update translations value if exits and but is not en language', async () => {
      const saveMock = jest.fn();
      const execMock = jest.fn().mockResolvedValue({ value: 'oldValue', save: saveMock });
      jest.spyOn(MockTranslationModel, 'findOne').mockReturnValue({ exec: execMock });
      jest.spyOn(MockTranslationModel, 'create').mockReturnValue({});

      await service.seedLanguageTranslations('vi', 'service1', { key1: 'value1' });
      expect(MockTranslationModel.findOne).toHaveBeenCalledWith({
        code: 'vi',
        service: 'service1',
        key: 'key1',
      });

      // not save and not create anything
      expect(saveMock).not.toHaveBeenCalled();
      expect(MockTranslationModel.create).not.toHaveBeenCalled();
    });
  });

  describe('getServiceTranlations', () => {
    it('should return translations for a given language and service', async () => {
      const mockTranslations = [{ key: 'test', value: 'testValue' }];
      jest.spyOn(MockTranslationModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTranslations),
      } as any);

      const result = await service.getServiceTranlations({ language: 'en', service: 'testService' });
      expect(result).toEqual({ translations: mockTranslations });
    });

    it('should return empty array if no translations found', async () => {
      jest.spyOn(MockTranslationModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await service.getServiceTranlations({ language: 'en', service: 'testService' });
      expect(result).toEqual({ translations: [] });
    });
  });
});
