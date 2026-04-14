import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:3001/api/v1/cart';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getAccessToken()}` });
  }

  getMyCart(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authHeaders(), withCredentials: true });
  }

  addProduct(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { productId }, { headers: this.authHeaders(), withCredentials: true });
  }

  removeProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${productId}`, { headers: this.authHeaders(), withCredentials: true });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear`, { headers: this.authHeaders(), withCredentials: true });
  }
}
