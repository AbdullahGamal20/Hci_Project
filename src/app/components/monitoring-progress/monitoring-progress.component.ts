import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { InstructorService } from '../../services/instructor/instructor.service';

@Component({
  selector: 'app-monitoring-progress',
  standalone: true,
  imports: [CommonModule, TableModule, ProgressBarModule, ToastModule],
  templateUrl: './monitoring-progress.component.html',
  styleUrls: ['./monitoring-progress.component.css'],
})
export class MonitoringProgressComponent implements OnInit {
  tableData: any[] = []; // Data to populate the table

  constructor(private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.fetchStudentsGrades();
  }

  fetchStudentsGrades(): void {
    this.instructorService.getStudentsGrades().subscribe({
      next: (data) => {
        this.tableData = data || []; // Assuming data is an array
      },
      error: (err) => {
        console.error('Error fetching student grades:', err);
      },
    });
  }
}
