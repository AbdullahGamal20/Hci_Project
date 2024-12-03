import { Component } from '@angular/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-course-enrollment',
  standalone: true,
  imports: [FormBuilderComponent],
  templateUrl: './course-enrollment.component.html',
  styleUrl: './course-enrollment.component.css',
})
export class CourseEnrollmentComponent {}
