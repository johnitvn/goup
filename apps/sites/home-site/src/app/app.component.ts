import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRoot],
  selector: 'home-root',
  template: `
    <tui-root>
      <router-outlet></router-outlet>
    </tui-root>
  `,
})
export class AppComponent {
  title = 'accounts';
}
