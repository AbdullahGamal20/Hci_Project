// main-layout.component.ts
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  template: `<app-sidebar> </app-sidebar> `,
  styles: [],
})
export class MainLayoutComponent {}
