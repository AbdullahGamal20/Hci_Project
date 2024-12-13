import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../services/instructor/instructor.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grade-assessment',
  standalone: true,
  imports: [TableModule, FormsModule, ToastModule],
  templateUrl: './grade-assessment.component.html',
  styleUrls: ['./grade-assessment.component.css'],
  providers: [MessageService], // Provide the MessageService
})
export class GradeAssessmentComponent implements OnInit {
  submissions: any[] = [];

  constructor(
    private instructorService: InstructorService,
    private messageService: MessageService // Inject the MessageService
  ) {}

  ngOnInit(): void {
    this.fetchSubmissions();
  }

  copyToClipboard(link: string): void {
    navigator.clipboard.writeText(link).then(
      () => {
        console.log('Link copied to clipboard:', link);
      },
      (error) => {
        console.error('Failed to copy the link:', error);
      }
    );
  }

  fetchSubmissions(): void {
    this.instructorService.getSubmissions().subscribe(
      (data) => {
        this.submissions = data;
        console.log('Submissions fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }

  sendGrade(
    assignmentId: string,
    submissionId: string,
    grade: number | null,
    feedback: string | null
  ): void {
    if (grade === null || grade < 0 || grade > 100) {
      console.error('Invalid grade. Please enter a value between 0 and 100.');
      return;
    }

    if (!feedback) {
      console.error('Feedback is required.');
      return;
    }

    this.instructorService
      .submitGrade(assignmentId, submissionId, { grade, feedback })
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Grade and feedback sent successful!',
          });
          console.log('Grade and feedback sent successfully:', response);
        },
        (error) => {
          console.error('Error sending grade and feedback:', error);
        }
      );
  }
}
