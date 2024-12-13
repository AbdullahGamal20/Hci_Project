import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student/student.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService], // Provide PrimeNG MessageService
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private messageService: MessageService, // Inject MessageService for toast notifications
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.studentService.login(this.loginForm.value).subscribe(
        (response: any) => {
          // Save response data to localStorage
          localStorage.setItem('userData', JSON.stringify(response));
          localStorage.setItem('token', response.token);

          // Show success toast on login
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'Welcome back!',
          });

          // Navigate to dashboard
          this.router.navigate(['/dashboard']);

          // Optionally clear the form
          this.loginForm.reset();
        },
        (error) => {
          // Show error toast if login fails
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid credentials. Please try again.',
          });
          console.error('Login error:', error);
        }
      );
    }
  }
}
