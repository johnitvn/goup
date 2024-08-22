import { APP_INITIALIZER } from '@angular/core';
import { SystemUrl } from '@goup/ng-system-url';
import { Translator } from '@goup/ng-translator';
import { provideInitializer } from './initializer.provider'; // Replace with actual file path

describe('provideInitializer', () => {
  let mockTranslator: Translator;
  let mockSystemUrl: SystemUrl;

  beforeEach(() => {
    // Mocking the dependencies
    mockTranslator = {
      initialize: jest.fn().mockResolvedValue(true),
    } as unknown as Translator;

    mockSystemUrl = {
      initialize: jest.fn(),
    } as unknown as SystemUrl;
  });

  it('should provide APP_INITIALIZER', () => {
    const siteName = 'testSite';
    const providers = provideInitializer(siteName);

    // Check if APP_INITIALIZER is provided
    const appInitializerProvider = providers.find((p: any) => p.provide === APP_INITIALIZER);
    expect(appInitializerProvider).toBeTruthy();
  });

  it('should initialize systemUrl with siteName', async () => {
    const siteName = 'testSite';
    const providers = provideInitializer(siteName);
    const appInitializerProvider = providers.find((p: any) => p.provide === APP_INITIALIZER);

    // Simulate the factory call
    const initializerFn = (appInitializerProvider as any).useFactory(mockTranslator, mockSystemUrl);
    await initializerFn();

    // Expect systemUrl to be initialized with the siteName
    expect(mockSystemUrl.initialize).toHaveBeenCalledWith(siteName);
  });

  it('should initialize translator', async () => {
    const siteName = 'testSite';
    const providers = provideInitializer(siteName);
    const appInitializerProvider = providers.find((p: any) => p.provide === APP_INITIALIZER);

    // Simulate the factory call
    const initializerFn = (appInitializerProvider as any).useFactory(mockTranslator, mockSystemUrl);
    await initializerFn();

    // Expect translator to be initialized
    expect(mockTranslator.initialize).toHaveBeenCalled();
  });

  it('should catch and log errors during initialization', async () => {
    const siteName = 'testSite';
    const providers = provideInitializer(siteName);
    const appInitializerProvider = providers.find((p: any) => p.provide === APP_INITIALIZER);

    // Mock translator initialization to fail
    const error = new Error('Initialization failed');
    mockTranslator.initialize = jest.fn().mockRejectedValue(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // Mock console.error
    });

    // Simulate the factory call
    const initializerFn = (appInitializerProvider as any).useFactory(mockTranslator, mockSystemUrl);
    await initializerFn();

    // Expect the error to be caught and logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to initialize application', error);

    // Cleanup
    consoleErrorSpy.mockRestore();
  });
});
