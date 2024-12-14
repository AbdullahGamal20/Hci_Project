import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Corrected 'styleUrl' to 'styleUrls'
  providers: [ConfirmationService, MessageService], // Provide ConfirmationService here
})
export class SidebarComponent implements OnInit {
  sidebarVisible: boolean = false;
  role: string | null = '';
  username: string | null = '';

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    try {
      const userData = localStorage.getItem('userData'); // Retrieve user data from localStorage
      if (userData) {
        const user = JSON.parse(userData); // Parse the JSON string
        this.role = user.user.role; // Set the role
        this.username = user.user.username; // Set the username
      } else {
        console.warn('No user data found in localStorage.');
        this.role = null;
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      this.role = null;
    }
  }

  onLogOut() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('userData'); // Optional: Remove user data as well
    this.router.navigate(['/']); // Redirect to the home page or login
  }
  confirmLogout() {
    // Trigger the confirmation dialog
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirm Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // If user confirms, call the logout logic
        this.onLogOut();
      },
      reject: () => {
        // Optional: handle rejection here
        console.log('Logout canceled');
      },
    });
  }
}
