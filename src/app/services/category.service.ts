import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = 'http://localhost:3001/api/v1/categories';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getAccessToken()}` });
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, { headers: this.authHeaders() });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, data, { headers: this.authHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }
}
