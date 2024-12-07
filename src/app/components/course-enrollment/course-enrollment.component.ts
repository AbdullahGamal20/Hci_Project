import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-enrollment.component.html',
  styleUrl: './course-enrollment.component.css',
})
export class CourseEnrollmentComponent implements OnInit {
  courses: { id: string; title: string }[] = []; // Store course titles and IDs
  selectedCourseId: string = ''; // Selected course ID
  studentId: string = ''; // Entered student ID

  constructor(private adminService: AdminService) {}

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
            alert('Enrollment successful!');
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
