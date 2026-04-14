import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:3001/api/v1/products';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getAccessToken()}` });
  }

  private noCacheHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    });
  }

  getAll(params?: any): Observable<any> {
    const requestParams = new HttpParams({
      fromObject: {
        ...(params || {}),
        _ts: Date.now().toString(),
      },
    });
    return this.http.get<any>(this.baseUrl, {
      params: requestParams,
      headers: this.noCacheHeaders(),
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      params: new HttpParams().set('_ts', Date.now().toString()),
      headers: this.noCacheHeaders(),
    });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product, { headers: this.authHeaders() });
  }

  update(id: string, product: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, product, { headers: this.authHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }
}
 