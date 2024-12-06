import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-monitoring-progress',
  standalone: true,
  imports: [CommonModule, TableModule, ProgressBarModule, ToastModule],
  templateUrl: './monitoring-progress.component.html',
  styleUrls: ['./monitoring-progress.component.css'],
})
export class MonitoringProgressComponent {
  tableData = [
    { studentName: 'John Doe', subjectName: 'Mathematics', progress: '80%' },
    { studentName: 'Doe', subjectName: 'Physics', progress: '65%' },
    { studentName: 'jane ', subjectName: 'Chemistry', progress: '90%' },
  ];
}
