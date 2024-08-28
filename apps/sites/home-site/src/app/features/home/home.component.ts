import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipeStandalone } from '@goup/common-initializer';

@Component({
  selector: 'home-home',
  standalone: true,
  imports: [CommonModule, TranslatePipeStandalone],
  template: `
    <h1>{{ 'branding.company-name' | translate }}</h1>
    <h2>{{ 'branding.project-name' | translate }}</h2>
  `,
  styles: ``,
})
export class HomeComponent {}
