import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-course-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  templateUrl: './course-enrollment.component.html',
  styleUrl: './course-enrollment.component.css',
  providers: [MessageService],
})
export class CourseEnrollmentComponent implements OnInit {
  courses: { id: string; title: string }[] = []; // Store course titles and IDs
  selectedCourseId: string = ''; // Selected course ID
  studentId: string = ''; // Entered student ID

  constructor(
    private adminService: AdminService,
    private messageService: MessageService // Inject MessageService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.adminService.getCourses().subscribe({
      next: (data) => {
        this.courses = data.map((course) => ({
          id: course._id,
          title: course.title,
        }));

        console.log('Courses fetched:', this.courses);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
  }

  enrollStudent(): void {
    if (this.selectedCourseId && this.studentId) {
      console.log(this.selectedCourseId + ' ' + this.studentId);
      this.adminService
        .enrollStudent(this.selectedCourseId, this.studentId)
        .subscribe({
          next: (response) => {
            console.log('Enrollment successful:', response);
            // Show success message
            this.messageService.add({
              severity: 'success',
              summary: 'Enrollment successful',
              detail: 'The user has been successfully Enrolled.',
            });
          },
          error: (err) => {
            console.error('Error during enrollment:', err);
            alert('Enrollment failed. Please try again.');
          },
        });
    } else {
      alert('Please select a course and enter a student ID.');
    }
  }
}
