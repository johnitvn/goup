/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Language } from '../schemas/language.schema';
import { LanguageService } from './language.service';
jest.mock('@goup/service-logger');

describe('LanguageService', () => {
  let service: LanguageService;
  let model: Model<Language>;

  const MockLanguageModel = {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageService,
        {
          provide: getModelToken(Language.name),
          useValue: MockLanguageModel,
        },
      ],
    }).compile();

    service = module.get<LanguageService>(LanguageService);
    model = module.get<Model<Language>>(getModelToken(Language.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onApplicationBootstrap', () => {
    it('should call seedLanguages', async () => {
      const seedLanguagesSpy = jest.spyOn(service, 'seedLanguages').mockImplementation(async () => {});
      await service.onApplicationBootstrap();
      expect(seedLanguagesSpy).toHaveBeenCalled();
    });
  });

  describe('seedLanguages', () => {
    it('should seed default language if no languages are present', async () => {
      jest.spyOn(MockLanguageModel, 'countDocuments').mockReturnValue(0);
      const createSpy = jest.spyOn(MockLanguageModel, 'create').mockResolvedValueOnce({} as any);

      await service.seedLanguages();

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'en', title: 'English', isDefault: true, isActive: true })
      );
    });

    it('should not seed default language if languages are present', async () => {
      jest.spyOn(MockLanguageModel, 'countDocuments').mockReturnValue(1);
      const saveSpy = jest.spyOn(MockLanguageModel, 'save');
      await service.seedLanguages();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all languages', async () => {
      const languages = [{ code: 'en', title: 'English', isDefault: true, isActive: true } as Language];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(languages),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(languages);
    });
  });

  describe('findAllActive', () => {
    it('should return all active languages', async () => {
      const activeLanguages = [{ code: 'en', title: 'English', isDefault: true, isActive: true } as Language];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(activeLanguages),
      } as any);

      const result = await service.findAllActive();
      expect(result).toEqual(activeLanguages);
    });
  });
});
