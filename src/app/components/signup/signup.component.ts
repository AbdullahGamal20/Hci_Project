import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student/student.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, ToastModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService], // Provide the MessageService
})
export class SignupComponent {
  SignupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private messageService: MessageService // Inject the MessageService
  ) {}

  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.SignupForm.valid) {
      const { confirmPassword, ...studentData } = this.SignupForm.value; // Exclude confirmPassword
      this.studentService.registerStudent(studentData).subscribe(
        (response) => {
          // Show success toast
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful!',
          });

          // Clear form inputs
          this.SignupForm.reset();
        },
        (error) => {
          // Show error toast
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Registration failed. Please try again.',
          });
        }
      );
    }
  }
}
