import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.css'],
})
export class CourseCreationComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      materials: this.fb.array([]),
      assignments: this.fb.array([]),
    });
  }

  get materials(): FormArray {
    return this.courseForm.get('materials') as FormArray;
  }

  get assignments(): FormArray {
    return this.courseForm.get('assignments') as FormArray;
  }

  addMaterial(): void {
    this.materials.push(
      this.fb.group({
        type: ['', Validators.required],
        content: ['', Validators.required],
      })
    );
  }

  removeMaterial(index: number): void {
    this.materials.removeAt(index);
  }

  addAssignment(): void {
    this.assignments.push(
      this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: ['', Validators.required],
        maxScore: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      })
    );
  }

  removeAssignment(index: number): void {
    this.assignments.removeAt(index);
  }

  onSubmit(): void {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      this.http
        .post('http://localhost:3000/courses', courseData, { headers })
        .subscribe(
          (response) => {
            console.log('Course created successfully', response);
          },
          (error) => {
            console.error('Error creating course', error);
          }
        );
      alert('Course created successfully!');
      this.courseForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }

  private getTokenFromLocalStorage(): string {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData && parsedUserData.token) {
        return parsedUserData.token;
      }
    }
    return ''; // Return empty string if no token is found
  }
}
