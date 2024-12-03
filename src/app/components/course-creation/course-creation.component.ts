import { Component } from '@angular/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-course-creation',
  standalone: true,
  imports: [FormBuilderComponent],
  templateUrl: './course-creation.component.html',
  styleUrl: './course-creation.component.css',
})
export class CourseCreationComponent {}
