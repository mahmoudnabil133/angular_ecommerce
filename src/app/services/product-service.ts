import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3001/api/v1/products';
  private categoryId = '6997793b5d2591fb25b310f0';

  constructor(private http: HttpClient) {}
  createProduct(product:any):Observable<any>{
    const body = {...product, categoryId:this.categoryId}
    return this.http.post(this.baseUrl, body);  
  }
  
  getAll():Observable<IProduct[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(res => res.docs.map((p: any) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        inStock: p.inStock,
        image: p.image, 
      })))
    );
}
  getById(id:string){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  update(id:string, product:any):Observable<any>{
    const body = {...product, categoryId:this.categoryId}
    return this.http.patch(`${this.baseUrl}/${id}`, body);
  }
  delete(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  // products:IProduct[] = [
  //   {
  //     id: 1,
  //     name: 'Laptop',
  //     price: 15000,
  //     description: 'High performance laptop',
  //     imageUrl: 'https://picsum.photos/200/200?random=1',
  //     catId:1
  //   },
  //   {
  //     id: 2,
  //     name: 'Phone',
  //     price: 8000, 
  //     description: 'Latest smartphone',
  //     imageUrl: 'https://picsum.photos/200/200?random=4',
  //     catId:1
  //   },
  //   {
  //     id: 3,
  //     name: 'Headphones',
  //     price: 1200,
  //     description: 'Noise cancelling headphones',
  //     imageUrl: 'https://picsum.photos/200/200?random=100',
  //     catId:2
  //   },
  //   {
  //     id: 4,
  //     name: 'Monitor',
  //     price: 5000,
  //     description: '4K Ultra HD monitor',
  //     imageUrl: 'https://picsum.photos/200/200?random=8',
  //     catId:1
  //   },
  //   {
  //     id: 5,
  //     name: 'Keyboard',
  //     price: 300,
  //     description: 'Mechanical keyboard',
  //     imageUrl: 'https://picsum.photos/200/200?random=12',
  //     catId:2
  //   },
  //   {
  //     id: 6,
  //     name: 'Mouse',
  //     price: 150,
  //     description: 'Wireless mouse',
  //     imageUrl: 'https://picsum.photos/200/200?random=16',
  //     catId:2
  //   }
  // ]
}
