import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  @Input() formName!: string;
  @Input() formFields: any[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    
    const controls: any = {};
    this.formFields.forEach((field) => {
      controls[field.name] = this.fb.control(field.value || '');
    });
    this.form = this.fb.group(controls);
  }

  onSubmit() {
    alert("submit")
  }
}
