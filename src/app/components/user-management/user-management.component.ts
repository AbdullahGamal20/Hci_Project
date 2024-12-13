import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service'; // Import the AdminService
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface UnapprovedUsersResponse {
  message: string;
  users: any[]; // This is the array of user objects
}

@Component({
  selector: 'app-user-management',
  imports: [TableModule, ToastModule],
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [MessageService], // Include MessageService for toast notifications
})
export class UserManagementComponent implements OnInit {
  approvedUsers: any[] = []; // Store approved users
  unapprovedUsers: any[] = []; // Correct initialization as an empty array

  constructor(
    private adminService: AdminService,
    private messageService: MessageService // Inject MessageService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchUnapprovedUsers();
  }

  fetchUsers(): void {
    this.adminService.getUsers().subscribe(
      (data) => {
        if (data && Array.isArray(data.users)) {
          this.approvedUsers = data.users;
        } else {
          console.error('Users data not found');
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchUnapprovedUsers(): void {
    this.adminService.getUnapprovedUsers().subscribe(
      (data) => {
        // Correctly assign the 'users' field to unapprovedUsers array
        if (data && Array.isArray(data.users)) {
          this.unapprovedUsers = data.users;
          console.log('Unapproved users:', this.unapprovedUsers); // Log the unapproved users
        } else {
          console.error('Users data not found');
        }
      },
      (error) => {
        console.error('Error fetching unapproved users:', error);
      }
    );
  }

  approveUser(id: string): void {
    // Call the service method to approve the user

    this.adminService.approveUser(id).subscribe(
      () => {
        // On success, move the user from unapproved to approved
        const userToApprove = this.unapprovedUsers.find(
          (user) => user._id === id
        );
        if (userToApprove) {
          this.approvedUsers.push(userToApprove);
          this.unapprovedUsers = this.unapprovedUsers.filter(
            (user) => user._id !== id
          );

          // Show success message
          this.messageService.add({
            severity: 'success',
            summary: 'User Approved',
            detail: 'The user has been successfully approved.',
          });
        }
      },
      (error) => {
        console.error('Error approving user:', error);
        // Show error message
        this.messageService.add({
          severity: 'error',
          summary: 'Approval Failed',
          detail: 'There was an error approving the user. Please try again.',
        });
      }
    );
  }

  // Delete user by ID
  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(
        () => {
          // Remove the deleted user from the array immediately
          this.approvedUsers = this.approvedUsers.filter(
            (user) => user._id !== id
          );

          // Show success message
          this.messageService.add({
            severity: 'success',
            summary: 'User Deleted',
            detail: 'The user has been successfully deleted.',
          });
        },
        (error) => {
          console.error('Error deleting user:', error);

          // Show error message
          this.messageService.add({
            severity: 'error',
            summary: 'Delete Failed',
            detail: 'There was an error deleting the user. Please try again.',
          });
        }
      );
    }
  }

  openEditModal(user: any): void {
    // Logic to open edit modal
  }
}
