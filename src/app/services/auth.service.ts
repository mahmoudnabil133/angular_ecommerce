import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3001/api/v1/auth';
  private accessToken: string | null = null;
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());
  constructor(private http: HttpClient, private router: Router) {}

  register(data: { fullName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: {email:string, password:string}):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, data, { withCredentials: true }).pipe(
      tap((res: any) => {
        this.accessToken = res.accessToken;
        const payload = this.decodeToken(res.accessToken);
        localStorage.setItem('user', JSON.stringify(payload));
        this.userSubject.next(payload);
      }
    )
  );
  }
  
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${this.accessToken}` }
    }).pipe(
      tap(() => this.forceLogout())
    );
  }
  forceLogout(): void {
    this.accessToken = null;
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  refresh(): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh`, {}, { withCredentials: true }).pipe(
      tap((res: any) => {
        // Note: your backend returns "accesstoken" (lowercase t) — match exactly
        this.accessToken = res.accesstoken;
        const payload = this.decodeToken(res.accesstoken);
        localStorage.setItem('user', JSON.stringify(payload));
        this.userSubject.next(payload);
      })
    );
  }
  
  isLoggedIn(): boolean { return !!this.userSubject.value; }

  isAdmin(): boolean { return this.userSubject.value?.role === 'admin'; }

  getAccessToken(): string | null { return this.accessToken; }
  
  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch { return null; }
  }

  private getStoredUser(): any {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }
  

}
