import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-access-course-materials',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './access-course-materials.component.html',
  styleUrls: ['./access-course-materials.component.css'],
})
export class AccessCourseMaterialsComponent implements OnInit {
  courses: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadCourseData();
  }

  loadCourseData(): void {
    this.studentService.fetchCourseMaterials().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
  }

  // transformData(apiData: any): any[] {
  //   if (!apiData || !Array.isArray(apiData)) {
  //     console.error('Invalid API response:', apiData);
  //     return [];
  //   }

  //   const unifiedList: any[] = [];
  //   apiData.forEach((course: any) => {
  //     // Add materials
  //     course.materials?.forEach((material: any) => {
  //       unifiedList.push({
  //         courseTitle: course.title,
  //         courseDescription: course.description,
  //         type: material.type,
  //         content: material.content,
  //         assignmentTitle: '',
  //         assignmentDescription: '',
  //         maxScore: '',
  //         dueDate: '',
  //       });
  //     });

  //     // Add assignments
  //     course.assignments?.forEach((assignment: any) => {
  //       unifiedList.push({
  //         courseTitle: course.title,
  //         courseDescription: course.description,
  //         type: 'Assignment',
  //         content: '',
  //         assignmentTitle: assignment.title,
  //         assignmentDescription: assignment.description,
  //         maxScore: assignment.maxScore,
  //         dueDate: assignment.dueDate,
  //       });
  //     });
  //   });

  //   return unifiedList;
  // }
}
