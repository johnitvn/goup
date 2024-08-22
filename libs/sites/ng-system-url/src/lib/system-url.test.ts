import { TestBed } from '@angular/core/testing';
import { WA_LOCATION } from '@ng-web-apis/common';
import { SystemUrl } from './system-url';

describe('SystemUrl', () => {
  let service: SystemUrl;
  const mockLocation = {
    hostname: 'sub.example.com',
    protocol: 'https:',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemUrl, { provide: WA_LOCATION, useValue: mockLocation }],
    });
    service = TestBed.inject(SystemUrl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize domain and protocol correctly', () => {
    expect(service.domain).toBe('example.com');
    expect(service.protocol).toBe('https:');
  });

  it('should initialize apiServerUrl and staticServerUrl correctly', () => {
    expect(service.apiServerUrl).toBe('https://api.example.com');
    expect(service.staticServerUrl).toBe('https://static.example.com');
  });

  it('should set siteName correctly', () => {
    service.initialize('testSite');
    expect(service.siteName).toBe('testSite');
  });

  it('should generate correct app site link', () => {
    const path = '/dashboard';
    expect(service.appSiteLink(path)).toBe('https://app.example.com/dashboard');
  });

  it('should generate correct home site link', () => {
    const path = '/home';
    expect(service.homeSiteLink(path)).toBe('https://example.com/home');
  });

  it('should generate correct account site link', () => {
    const path = '/profile';
    expect(service.accountSiteLink(path)).toBe('https://account.example.com/profile');
  });

  it('should generate correct api link', () => {
    const path = '/v1/users';
    expect(service.apiLink(path)).toBe('https://api.example.com/v1/users');
  });

  it('should generate correct asset link', () => {
    const path = '/images/logo.png';
    expect(service.assetLink(path)).toBe('https://static.example.com/assets/images/logo.png');
  });
});
