import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface UnapprovedUsersResponse {
  message: string;
  users: any[];
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin'; // API URL for approved users

  constructor(private http: HttpClient) {}

  // User management start
  // Fetch approved users from the API with the Authorization header
  getUsers(): Observable<UnapprovedUsersResponse> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UnapprovedUsersResponse>(
      `${this.apiUrl}/approved-users`,
      {
        headers,
      }
    );
  }

  // Fetch unapproved users from the API with the Authorization header
  getUnapprovedUsers(): Observable<UnapprovedUsersResponse> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UnapprovedUsersResponse>(
      `${this.apiUrl}/unapproved-users`,
      { headers }
    );
  }

  approveUser(id: string): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Assuming there's no body to send, or if there is, include it in the second argument
    return this.http.patch(
      `${this.apiUrl}/approve-user/${id}`,
      {},
      { headers }
    );
  }

  deleteUser(id: string): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/users/${id}`, {
      headers,
    });
  }
  // User management end

  //Course Enrollment start
  getCourses(): Observable<any[]> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>('http://localhost:3000/courses', { headers });
  }

  enrollStudent(courseId: string, studentId: string): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `http://localhost:3000/courses/${courseId}/enroll/${studentId}`;
    return this.http.post(url, {}, { headers });
  }

  updateCourse(courseId: string, updatedCourse: any): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrl}/courses/${courseId}`, updatedCourse, {
      headers,
    });
  }

  deleteCourse(id: string): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/courses/${id}`, {
      headers,
    });
  }

  // Helper method to get the token from localStorage
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
