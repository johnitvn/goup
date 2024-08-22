import { Inject, Injectable } from '@angular/core';
import { WA_LOCATION } from '@ng-web-apis/common';
@Injectable({ providedIn: 'root' })
export class SystemUrl {
  siteName?: string;
  protocol: string;
  domain: string;
  staticServerUrl: string;
  apiServerUrl: string;

  constructor(@Inject(WA_LOCATION) private location: Location) {
    this.domain = this.location.hostname.split('.').slice(-2).join('.');
    this.protocol = this.location.protocol;
    this.apiServerUrl = `${this.protocol}//api.${this.domain}`;
    this.staticServerUrl = `${this.protocol}//static.${this.domain}`;
  }

  initialize(siteName: string) {
    this.siteName = siteName;
  }

  public appSiteLink(path: string): string {
    return `${this.protocol}//app.${this.domain}${path.startsWith('/') ? path : `/${path}`}`;
  }

  public homeSiteLink(path: string): string {
    return `${this.protocol}//${this.domain}${path.startsWith('/') ? path : `/${path}`}`;
  }

  public accountSiteLink(path: string): string {
    return `${this.protocol}//account.${this.domain}${path.startsWith('/') ? path : `/${path}`}`;
  }

  public apiLink(path: string): string {
    return `${this.protocol}//api.${this.domain}${path.startsWith('/') ? path : `/${path}`}`;
  }

  public assetLink(path: string): string {
    return `${this.protocol}//static.${this.domain}/assets${path.startsWith('/') ? path : `/${path}`}`;
  }
}
