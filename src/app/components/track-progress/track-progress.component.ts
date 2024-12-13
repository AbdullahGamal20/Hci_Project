import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-track-progress',
  standalone: true,
  imports: [CommonModule, TableModule, ProgressBarModule],
  templateUrl: './track-progress.component.html',
  styleUrl: './track-progress.component.css',
})
export class TrackProgressComponent implements OnInit {
  tableData: any[] = [];
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.studentService.fetchGrades().subscribe({
      next: (data) => {
        this.tableData = this.transformData(data);
      },
      error: (err) => {
        console.error('Error fetching grades:', err);
      },
    });
  }

  transformData(apiData: any): any[] {
    if (!apiData || !apiData.courses || !Array.isArray(apiData.courses)) {
      console.error('Invalid API response:', apiData);
      return [];
    }

    return apiData.courses.flatMap((course: any) => {
      if (!course.course || !course.grades || !Array.isArray(course.grades)) {
        console.warn('Invalid course structure:', course);
        return [];
      }

      return course.grades.map((grade: any) => ({
        courseName: course.course.title || 'Unknown Course',
        feedback: grade.feedback || 'No Feedback',
        assignment: grade.assignmentName || 'No Assignment name ',

        score: grade.score || 0,
      }));
    });
  }
}
