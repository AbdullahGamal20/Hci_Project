import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private baseUrl = 'http://localhost:3000'; // Base API URL

  constructor(private http: HttpClient) {}

  // Get Students Grades for Monitor the progress
  getStudentsGrades(): Observable<any[]> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/instructor/my-courses/students-grades`;
    return this.http.get<any[]>(url, { headers });
  }

  // Course Creation
  createCourse(courseData: any): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/courses`;
    return this.http.post(url, courseData, { headers });
  }

  getSubmissions(): Observable<any[]> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.baseUrl}/instructor/submissions`, {
      headers,
    });
  }

  submitGrade(
    assignmentId: string,
    submissionId: string,
    payload: { grade: number; feedback: string }
  ): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/assignments/${assignmentId}/submissions/${submissionId}/grade`;
    return this.http.put(url, payload, { headers });
  }

  private getTokenFromLocalStorage(): string {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData && parsedUserData.token) {
        return parsedUserData.token;
      }
    }
    return ''; // Return empty string if no token is found
  }
}
