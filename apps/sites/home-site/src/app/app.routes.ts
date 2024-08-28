import { Route } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
];
