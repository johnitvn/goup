import 'jest-preset-angular/setup-jest';

declare global {
  // eslint-disable-next-line no-var
  var ngJest: {
    testEnvironmentOptions: {
      errorOnUnknownElements: boolean;
      errorOnUnknownProperties: boolean;
    };
  };
}
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};
