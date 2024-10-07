import { GrpcServiceBootstrapModule, MongoDBConfigSchema } from '@goup/service-grpc';
import { v1 } from '@goup/service-protobuf';
import { GrpcClientTesting, GrpcServerTesting } from '@goup/service-testing';
import { firstValueFrom } from 'rxjs';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { AppModule } from '../src/app.module';

describe('LanguageManagement', () => {
  const DATABASE_NAME = 'language';
  const SERVER_START_TIMEOUT = 12000;
  const SETUP_TIMEOUT = 30000;

  let grpcServer: GrpcServerTesting;
  let managementService: v1.LanguageManagementService;
  let activeService: v1.ActiveLanguageService;
  let mongoContainer: StartedTestContainer;

  beforeAll(async () => {
    process.stdout.write('Starting server');

    mongoContainer = await new GenericContainer('docker.io/mongo:4.4')
      .withExposedPorts(27017)
      .withEnvironment({ MONGO_INITDB_DATABASE: DATABASE_NAME })
      .start();

    const mongoUri = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(27017)}`;
    process.env.MONGODB_URL = mongoUri;
    process.env.MONGODB_DATABASE = DATABASE_NAME;

    grpcServer = await GrpcServerTesting.createGrpcServer(
      GrpcServiceBootstrapModule.launch(AppModule, [MongoDBConfigSchema]),
      {
        packageName: `v1`,
        protoFile: `language.proto`,
        timeout: SERVER_START_TIMEOUT,
      }
    );
    const languageManagementServiceProxy = await GrpcClientTesting.createGrpcClient(grpcServer.options);
    managementService =
      languageManagementServiceProxy.getService<v1.LanguageManagementService>('LanguageManagementService');
    activeService = languageManagementServiceProxy.getService<v1.ActiveLanguageService>('ActiveLanguageService');
  }, SETUP_TIMEOUT);

  afterAll(async () => {
    process.stdout.write('Closing server');
    await grpcServer.stop();
    await mongoContainer.stop({
      removeVolumes: true,
      remove: true,
    });
  });

  async function getAllLanguageIds() {
    return (await firstValueFrom(managementService.listLanguages({}))).languages.map(({ id }) => id);
  }

  async function getLanguageIdsWithPageSize(pageSize: number) {
    const response = await firstValueFrom(managementService.listLanguages({ paging: { pageSize } }));
    return response.languages.map(({ id }) => id);
  }

  async function expectAllLanguagesStatus(status: v1.LanguageStatus) {
    const listResponse = await firstValueFrom(managementService.listLanguages({}));
    expect(listResponse.languages.every((language) => language.status === status)).toBeTruthy();
  }

  describe('Active Languages', () => {
    it('should return active language', async () => {
      const request = activeService.getActiveLanguages({});
      const { languages } = await firstValueFrom(request);
      expect(languages).toEqual([
        { id: expect.any(String), code: 'en', name: 'English', isDefault: true },
        { id: expect.any(String), code: 'vi', name: 'Tiếng Việt', isDefault: false },
      ]);
    });
  });

  describe('Language Listing', () => {
    it('should return list all languages', async () => {
      const request = managementService.listLanguages({});
      const { languages } = await firstValueFrom(request);
      expect(languages.length).toBe(84);
    });

    it('should return list all active languages', async () => {
      const filters = [{ field: 'status', operator: v1.FilterOperator.EQUAL, numberValue: v1.LanguageStatus.ACTIVE }];
      const request = managementService.listLanguages({ filters });
      const { languages } = await firstValueFrom(request);
      expect(languages.every((language) => language.status === v1.LanguageStatus.ACTIVE)).toBeTruthy();
    });

    it('should return list all inactive languages', async () => {
      const filters = [{ field: 'status', operator: v1.FilterOperator.EQUAL, numberValue: v1.LanguageStatus.INACTIVE }];
      const request = managementService.listLanguages({ filters });
      const { languages } = await firstValueFrom(request);
      expect(languages.every((language) => language.status === v1.LanguageStatus.INACTIVE)).toBeTruthy();
    });
  });

  describe('Language Update', () => {
    it('should update languages successfully', async () => {
      const ids = await getAllLanguageIds();
      await firstValueFrom(
        managementService.updateLanguages({ ids, language: { status: v1.LanguageStatus.INACTIVE } })
      );
      await expectAllLanguagesStatus(v1.LanguageStatus.INACTIVE);
    });

    it('should throw error when updating multiple languages to default language', async () => {
      const ids = await getLanguageIdsWithPageSize(2);
      const request = managementService.updateLanguages({ ids, language: { isDefault: true } });
      await expect(firstValueFrom(request)).rejects.toThrow('Only one language can be default');
    });
  });

  describe('Special Cases', () => {
    it('should make language pending active', async () => {
      const id = (await firstValueFrom(managementService.listLanguages({}))).languages.find(
        ({ code }) => code === 'yi'
      ).id;
      const response = await firstValueFrom(
        managementService.updateLanguages({ ids: [id], language: { status: v1.LanguageStatus.ACTIVE } })
      );
      expect(response.languages.length).toBe(1);
      expect(response.languages[0].status).toBe(v1.LanguageStatus.PENDING_ACTIVE);
    });
  });
});
