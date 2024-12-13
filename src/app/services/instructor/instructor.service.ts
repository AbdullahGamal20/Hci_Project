import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private baseUrl = 'http://localhost:3000'; // Base API URL

  constructor(private http: HttpClient) {}

  getStudentsGrades(): Observable<any[]> {
    const token = this.getTokenFromLocalStorage();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/instructor/my-courses/students-grades`;
    return this.http.get<any[]>(url, { headers });
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
