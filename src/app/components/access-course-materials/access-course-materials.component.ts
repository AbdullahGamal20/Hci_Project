import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-access-course-materials',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './access-course-materials.component.html',
  styleUrls: ['./access-course-materials.component.css'],
})
export class AccessCourseMaterialsComponent {
  courseMaterials = [
    {
      courseName: 'Mathematics 101',
      instructorName: 'Dr. John Doe',
      fileUrl: '/test.txt',
    },
    {
      courseName: 'Physics Basics',
      instructorName: 'Prof. Jane Smith',
      fileUrl: '/test.pdf',
    },
    {
      courseName: 'Chemistry Advanced',
      instructorName: 'Dr. Emily Johnson',
      fileUrl: '/test.pdf',
    },
  ];

  downloadFile(fileUrl: string) {
    const link = document.createElement('a');
    // 7t link 2l downloadble file fe 2l params(file Url)
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'lecture_file';
    link.click();
  }
}
