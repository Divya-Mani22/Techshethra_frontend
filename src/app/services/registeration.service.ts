import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private apiUrl = 'http://localhost:8082/api/register';

  constructor(private http: HttpClient) {}

  // FIX: Controller-la @PostMapping-ku path illathathaala base URL mattum pothum
  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/update-status/${id}`;
    return this.http.put(url, { status: status });
  }
  getRegistrationCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}