// user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service'; // Import the AdminService
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-management',
  imports: [TableModule],
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // this.getApprovedUsers();
  }

  // getApprovedUsers(): void {
  //   this.adminService.getApprovedUsers().subscribe(
  //     (data) => {
  //       this.users = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching approved users:', error);
  //     }
  //   );
  // }

  openEditModal(user: any): void {
    // Implement your edit logic here
    console.log('Edit user:', user);
  }
}
