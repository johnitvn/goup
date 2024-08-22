/* eslint-disable @angular-eslint/use-pipe-transform-interface */
import { ChangeDetectorRef, Pipe } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translator',
  standalone: true,
  pure: false,
})
export class TranslatorPipe extends TranslatePipe {
  constructor(translate: TranslateService, private ref: ChangeDetectorRef) {
    super(translate, ref);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override transform(query: string, defaultValue?: string, description?: string, ...args: any[]): any {
    return super.transform(query, ...args);
  }
}
