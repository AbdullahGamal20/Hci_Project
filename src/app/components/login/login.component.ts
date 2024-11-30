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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private router: Router
  ) {
    this.loginForm = this.fb.group({
      phoneNum: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // if (this.loginForm.valid) {
    //   this.sharedService
    //     .login(this.loginForm.get('phoneNum')!.value)
    //     .subscribe((res) =>
    //       res
    //         ? this.router.navigate(['/dashboard'])
    //         : alert('Invalid Phone Number')
    //     );
    // } else {
    //   console.log('Form is invalid');
    // }
  }
}
