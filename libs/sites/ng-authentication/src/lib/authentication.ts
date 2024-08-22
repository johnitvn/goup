import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemUrl } from '@goup/ng-system-url';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private tokenCookieName = 'tk';
  private refreshTokenCookieName = 'rftk';
  private tokenUrl = 'https://your-api.com/token'; // URL để lấy token mới
  private refreshTokenUrl = 'https://your-api.com/refresh-token'; // URL để làm mới token
  private refreshTokenTimeout?: NodeJS.Timeout;
  private loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private cookieService: SsrCookieService, private systemLinkService: SystemUrl) {
    this.loggedIn = new BehaviorSubject<boolean>(
      this.cookieService.check(this.tokenCookieName) || this.cookieService.check(this.refreshTokenCookieName)
    );
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<void>(this.tokenUrl, { username, password }).pipe(
      tap((response) => {
        this.setSession(response);
        this.loggedIn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private setSession(authResult: any): void {
    const expiresAt = new Date(authResult.expiresAt);
    this.cookieService.set(this.tokenCookieName, authResult.token, {
      expires: expiresAt,
      domain: this.systemLinkService.domain,
      sameSite: 'Lax',
    });
    this.cookieService.set(this.refreshTokenCookieName, authResult.refreshToken, {
      expires: expiresAt,
      domain: this.systemLinkService.domain,
      sameSite: 'Lax',
    });
    this.scheduleRefreshToken(expiresAt);
  }

  private scheduleRefreshToken(expiresAt: Date): void {
    const expiresIn = expiresAt.getTime() - Date.now();
    const refreshIn = expiresIn - 60 * 1000; // Làm mới token trước 1 phút
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), refreshIn);
  }

  private refreshToken(): Observable<void> {
    const refreshToken = this.cookieService.get(this.refreshTokenCookieName);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http.post<any>(this.refreshTokenUrl, { refreshToken }).pipe(
      tap((response) => {
        this.setSession(response);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.cookieService.delete(this.tokenCookieName, undefined, this.systemLinkService.domain);
    this.cookieService.delete(this.refreshTokenCookieName, undefined, this.systemLinkService.domain);
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isLogggedInInstant(): boolean {
    return this.loggedIn.value;
  }

  private handleError(error: unknown): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
