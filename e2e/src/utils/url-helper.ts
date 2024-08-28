export class URLHelper {
  public static readonly HOME_BASE_URL = process.env['BASE_DOMAIN'] || 'http://lacolhost.com';

  public static homeUrl(path = '/'): string {
    return `${URLHelper.HOME_BASE_URL}${path}`;
  }
}
