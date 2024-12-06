import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarVisible: boolean = false;

  constructor(
    // private sharedService: SharedServiceService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogOut() {
    // this.sharedService.logout();
    // this.router.navigate(['/']);
  }
}
