import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoginOrRegisterPage: boolean = false; // To check if the user is on the login or register page

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the current URL is either /login or /register
        this.isLoginOrRegisterPage =
          event.urlAfterRedirects === '/' ||
          event.urlAfterRedirects === '/register';
      });

    // If no token and user navigates to a restricted page, redirect to login
    if (!localStorage.getItem('token') && !this.isLoginOrRegisterPage) {
      this.router.navigate(['/']);
    }
  }

  private checkAuthentication(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
    }
  }
}
