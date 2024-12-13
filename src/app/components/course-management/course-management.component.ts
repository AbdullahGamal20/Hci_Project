import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service'; // Update the path as necessary
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
  providers: [MessageService], // Add MessageService provider
})
export class CourseManagementComponent implements OnInit {
  courses: any[] = []; // Store courses
  visible: boolean = false;
  selectedCourse: any = {}; // Holds the selected course for editing

  constructor(
    private adminService: AdminService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.adminService.getCourses().subscribe({
      next: (data) => {
        this.courses = data.map((course: any) => ({
          id: course._id,
          title: course.title,
          description: course.description,
          instructor: course.instructor?.username,
        }));
        console.log(this.courses);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
  }

  showDialog(course: any): void {
    // Set the selected course to be edited
    this.selectedCourse = { ...course }; // Create a copy to avoid mutating original data
    this.visible = true;
  }

  saveCourse(): void {
    // Prepare data to be sent to the backend with only title and description updated
    const updatedCourse = {
      ...this.selectedCourse, // Copy the selected course
      title: this.selectedCourse.title,
      description: this.selectedCourse.description,
    };

    // Send the updated course data to the backend
    this.adminService.updateCourse(updatedCourse.id, updatedCourse).subscribe({
      next: () => {
        this.loadCourses(); // Reload courses to reflect the changes
        this.messageService.add({
          severity: 'success',
          summary: 'Course Updated',
          detail: 'The course information has been updated successfully.',
        });
        this.visible = false; // Close the dialog
      },
      error: (err) => {
        console.error('Error updating course:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Update Failed',
          detail: 'Failed to update the course.',
        });
      },
    });
  }
  deleteCourse(courseId: string): void {
    // Call the service method to delete the course
    this.adminService.deleteCourse(courseId).subscribe({
      next: () => {
        // If successful, remove the course from the list and show a success message
        this.courses = this.courses.filter((course) => course.id !== courseId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course deleted successfully',
        });
      },
      error: (err) => {
        console.error('Error deleting course:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete course',
        });
      },
    });
  }
}
