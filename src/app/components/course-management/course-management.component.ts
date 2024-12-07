import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  standalone: true,
  selector: 'app-course-management',
  imports: [CommonModule, FormsModule, TableModule, ConfirmDialogModule], // Add FormsModule here
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent {
  users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Instructor',
    },
    { id: 2, name: 'John', email: 'John@example.com', role: 'User' },
  ];

  selectedUser: any = null;
  isEditMode = false;

  openAddModal() {
    this.isEditMode = false;
    this.selectedUser = { id: null, name: '', email: '', role: '' };
  }

  openEditModal(user: any) {
    this.isEditMode = true;
    this.selectedUser = { ...user };
  }

  saveUser() {
    if (this.isEditMode) {
      const index = this.users.findIndex(
        (user) => user.id === this.selectedUser.id
      );
      this.users[index] = this.selectedUser;
    } else {
      this.selectedUser.id = this.users.length + 1;
      this.users.push(this.selectedUser);
    }
    this.selectedUser = null;
  }

  deleteUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
