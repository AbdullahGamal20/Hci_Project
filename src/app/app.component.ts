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
    // Listen for route changes and determine if the user is on a public page
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const publicPages = ['/', '/register'];
        this.isLoginOrRegisterPage = publicPages.includes(
          event.urlAfterRedirects
        );

        // If no token and not on a public page, redirect to the login page
        if (!localStorage.getItem('token') && !this.isLoginOrRegisterPage) {
          this.router.navigate(['/']);
        }
      });
  }
}
