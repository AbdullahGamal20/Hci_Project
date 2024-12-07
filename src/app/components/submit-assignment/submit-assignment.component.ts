import { Component } from '@angular/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-submit-assignment',
  standalone: true,
  imports: [FormBuilderComponent],
  templateUrl: './submit-assignment.component.html',
  styleUrl: './submit-assignment.component.css',
})
export class SubmitAssignmentComponent {}
