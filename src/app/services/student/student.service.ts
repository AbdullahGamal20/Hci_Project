import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, studentData);
  }
  // Login API Call
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Get All Grades For The student
  fetchGrades(): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/my-grades`, { headers });
  }

  // Get All course materials and Courses For The student
  fetchCourseMaterials(): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/courses`, { headers });
  }

  getMyAssignments(): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/my-assignments`, { headers });
  }

  submitAssignment(assignmentId: string, file: File): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.apiUrl}/assignments/${assignmentId}/submit`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData, { headers });
  }

  private getTokenFromLocalStorage(): string {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      // Check if the parsed data contains the token field
      if (parsedUserData && parsedUserData.token) {
        return parsedUserData.token;
      }
    }

    return ''; // Return empty string if no token is found
  }
}
