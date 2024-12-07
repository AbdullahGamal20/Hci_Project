import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-track-progress',
  standalone: true,
  imports: [CommonModule, TableModule, ProgressBarModule],
  templateUrl: './track-progress.component.html',
  styleUrl: './track-progress.component.css',
})
export class TrackProgressComponent {
  tableData = [
    { studentName: 'John Doe', subjectName: 'Mathematics', progress: '80%' },
    { studentName: 'Doe', subjectName: 'Physics', progress: '65%' },
    { studentName: 'jane ', subjectName: 'Chemistry', progress: '90%' },
  ];
}
