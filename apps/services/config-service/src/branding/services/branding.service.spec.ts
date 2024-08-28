import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Branding } from '../schemas/theme.schema';
import { BrandingService } from './branding.service';
jest.mock('@goup/service-logger');

describe('BrandingService', () => {
  let service: BrandingService;
  let model: Model<Branding>;

  const mockBrandingModel = {
    find: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandingService,
        {
          provide: getModelToken(Branding.name),
          useValue: mockBrandingModel,
        },
      ],
    }).compile();

    service = module.get<BrandingService>(BrandingService);
    model = module.get<Model<Branding>>(getModelToken(Branding.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onApplicationBootstrap', () => {
    it('should seed default branding data if no documents exist', async () => {
      jest.spyOn(service, 'seedDefaultBranding').mockImplementation(async () => {
        return;
      });
      await service.onApplicationBootstrap();
      expect(service.seedDefaultBranding).toHaveBeenCalled();
    });
  });

  describe('seedDefaultBranding', () => {
    it('should seed default branding data if no documents exist', async () => {
      mockBrandingModel.countDocuments = jest.fn().mockResolvedValue(0);

      await service.seedDefaultBranding();

      expect(mockBrandingModel.countDocuments).toHaveBeenCalled();
      expect(mockBrandingModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'Goup',
          companyName: 'Goup CO.,LTD',
          primaryColor: '#526ed3',
          primaryColorHover: '#6c86e2',
          primaryColorPressed: '#314692',
          accentColor: '#ff7043',
          accentColorHover: '#ff9a94',
          accentColorPressed: '#e7716a',
        })
      );
    });

    it('should not seed default branding data if documents exist', async () => {
      mockBrandingModel.countDocuments = jest.fn().mockResolvedValue(1);

      await service.seedDefaultBranding();

      expect(mockBrandingModel.countDocuments).toHaveBeenCalled();
      expect(mockBrandingModel.save).not.toHaveBeenCalled();
    });
  });

  describe('getBranding', () => {
    it('should return branding data if it exists', async () => {
      const brandingData = {
        projectName: 'Goup',
        companyName: 'Goup CO.,LTD',
        primaryColor: '#526ed3',
        primaryColorHover: '#6c86e2',
        primaryColorPressed: '#314692',
        accentColor: '#ff7043',
        accentColorHover: '#ff9a94',
        accentColorPressed: '#e7716a',
      };
      mockBrandingModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(brandingData),
      });

      const result = await service.getBranding();

      expect(result).toEqual(brandingData);
      expect(mockBrandingModel.findOne().exec).toHaveBeenCalled();
    });

    it('should throw an error if branding data does not exist', async () => {
      mockBrandingModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.getBranding()).rejects.toThrow('Branding data not found');
      expect(mockBrandingModel.findOne().exec).toHaveBeenCalled();
    });
  });
});
