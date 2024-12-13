import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submit-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-assignment.component.html',
  styleUrl: './submit-assignment.component.css',
})
export class SubmitAssignmentComponent implements OnInit {
  assignments: any[] = []; // To store the processed assignments
  selectedAssignment: string = ''; // Selected assignment ID
  selectedFile: File | null = null; // File selected for upload

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchAssignments();
  }

  fetchAssignments(): void {
    this.studentService.getMyAssignments().subscribe({
      next: (response) => {
        this.assignments = response.assignments || []; // Extract assignments array
      },
      error: (err) => {
        console.error('Error fetching assignments:', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.selectedAssignment || !this.selectedFile) {
      alert('Please select an assignment and upload a file.');
      return;
    }

    this.studentService
      .submitAssignment(this.selectedAssignment, this.selectedFile)
      .subscribe({
        next: (response) => {
          alert('Assignment submitted successfully!');
          console.log('Response:', response);
          this.resetForm();
        },
        error: (error) => {
          alert('Error submitting assignment.');
          console.error('Error:', error);
        },
      });
  }
  resetForm(): void {
    this.selectedAssignment = ''; // Clear the selected assignment
    this.selectedFile = null; // Clear the selected file
  }
}
