import { Component } from '@angular/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-grade-assessment',
  standalone: true,
  imports: [FormBuilderComponent],
  templateUrl: './grade-assessment.component.html',
  styleUrl: './grade-assessment.component.css',
})
export class GradeAssessmentComponent {}
