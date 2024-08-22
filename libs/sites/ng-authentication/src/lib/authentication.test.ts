import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SystemUrl } from '@goup/ng-system-url';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Authentication } from './authentication';

describe('Authentication', () => {
  let service: Authentication;
  let httpMock: HttpTestingController;
  let cookieService: SsrCookieService;
  let systemUrl: SystemUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Authentication, SsrCookieService, { provide: SystemUrl, useValue: { domain: 'your-domain.com' } }],
    });

    service = TestBed.inject(Authentication);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(SsrCookieService);
    systemUrl = TestBed.inject(SystemUrl);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set session', () => {
    const mockResponse = {
      token: 'test-token',
      refreshToken: 'test-refresh-token',
      expiresAt: new Date().toISOString(),
    };
    jest.spyOn(cookieService, 'set').mockImplementation();

    service.login('username', 'password').subscribe();

    const req = httpMock.expectOne('https://your-api.com/token');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    expect(cookieService.set).toHaveBeenCalledTimes(2);
  });

  it('should handle login error', () => {
    jest.spyOn(console, 'error').mockImplementation();
    service.login('username', 'password').subscribe(
      () => fail('expected an error'),
      (error) => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne('https://your-api.com/token');
    req.flush('Login error', { status: 500, statusText: 'Server Error' });

    expect(console.error).toHaveBeenCalled();
  });

  it('should refresh token', () => {
    const mockResponse = { token: 'new-token', refreshToken: 'new-refresh-token', expiresAt: new Date().toISOString() };
    jest.spyOn(cookieService, 'get').mockReturnValue('test-refresh-token');
    jest.spyOn(service as any, 'setSession').mockImplementation();

    (service as any).refreshToken().subscribe();

    const req = httpMock.expectOne('https://your-api.com/refresh-token');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect((service as any).setSession).toHaveBeenCalledWith(mockResponse);
  });

  it('should handle refresh token error', () => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(cookieService, 'get').mockReturnValue('test-refresh-token');

    (service as any).refreshToken().subscribe(
      () => fail('expected an error'),
      (error: any) => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne('https://your-api.com/refresh-token');
    req.flush('Refresh token error', { status: 500, statusText: 'Server Error' });

    expect(console.error).toHaveBeenCalled();
  });

  it('should logout and clear session', () => {
    jest.spyOn(cookieService, 'delete').mockImplementation();
    jest.spyOn(service as any, 'scheduleRefreshToken').mockImplementation();

    service.logout();

    expect(cookieService.delete).toHaveBeenCalledWith('tk', undefined, 'your-domain.com');
    expect(cookieService.delete).toHaveBeenCalledWith('rftk', undefined, 'your-domain.com');
    expect(service.isLogggedInInstant()).toBeFalsy();
  });

  it('should return loggedIn status as observable', (done) => {
    service.isLoggedIn().subscribe((status) => {
      expect(status).toBeFalsy();
      done();
    });
  });

  it('should return loggedIn status instantly', () => {
    expect(service.isLogggedInInstant()).toBeFalsy();
  });
});
