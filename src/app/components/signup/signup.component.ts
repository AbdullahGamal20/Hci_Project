import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  SignupForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private router: Router
  ) {
    this.SignupForm = this.fb.group({
      phoneNum: ['', Validators.required],
    });
  }

  onSubmit(): void {
    alert("sgin up clicked")
  }

}
