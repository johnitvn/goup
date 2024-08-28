import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * A custom Angular pipe that translates a given string value using the TranslateService.
 *
 * @example
 * <div>{{ 'HELLO' | translate }}</div>
 *
 * @remarks
 * This pipe is marked as standalone and impure. It uses the TranslateService to fetch the
 * translated value asynchronously.
 *
 * @decorator `@Pipe`
 *
 * @class
 * @implements {PipeTransform}
 *
 * @constructor
 * @param {TranslateService} translate - The service used to perform the translation.
 *
 * @method
 * @name transform
 * @param {string} value - The string value to be translated.
 * @returns {string} The translated string value.
 */
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipeStandalone implements PipeTransform {
  private translatedValue = '';

  constructor(private translate: TranslateService) {}

  /**
   * Transforms the given value by translating it.
   *
   * @param value - The string value to be translated.
   * @returns The translated string value.
   */
  transform(value: string): string {
    this.translate.get(value).subscribe((translation: string) => {
      this.translatedValue = translation;
    });
    return this.translatedValue;
  }
}
