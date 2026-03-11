import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { identifierName } from '@angular/compiler';
import { FormsModule} from '@angular/forms';
/* binding
  1) interpolation
    from controller(x.ts) ==> to view(x.html) {{prod.name}}
  2) property
    from controller(x.ts) ==> to view(x.html) [src]="prod.img"
  3) event
    from view(x.html) ==> to controller(x.ts) (click)="buy(prod.price)"
  4) 2 way binding
    both controller(x.ts) <==> to view(x.html) [(ngModel)]="selectedCatId"
  5) class binding 
    apply class style on condition. 
*/


@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
 products: IProduct[];
 categories:any[];
 selectedPrice:number=0;
 selectedCatId:number=0;


  constructor(){
    this.products = [
      {
        id: 1,
        name: 'Laptop',
        price: 15000,
        description: 'High performance laptop',
        imageUrl: 'https://picsum.photos/200/200?random=1',
        catId:1
      },
      {
        id: 2,
        name: 'Phone',
        price: 8000, 
        description: 'Latest smartphone',
        imageUrl: 'https://picsum.photos/200/200?random=4',
        catId:1
      },
      {
        id: 3,
        name: 'Headphones',
        price: 1200,
        description: 'Noise cancelling headphones',
        imageUrl: 'https://picsum.photos/200/200?random=100',
        catId:2
      },
      {
        id: 4,
        name: 'Monitor',
        price: 5000,
        description: '4K Ultra HD monitor',
        imageUrl: 'https://picsum.photos/200/200?random=8',
        catId:1
      },
      {
        id: 5,
        name: 'Keyboard',
        price: 300,
        description: 'Mechanical keyboard',
        imageUrl: 'https://picsum.photos/200/200?random=12',
        catId:2
      },
      {
        id: 6,
        name: 'Mouse',
        price: 150,
        description: 'Wireless mouse',
        imageUrl: 'https://picsum.photos/200/200?random=16',
        catId:2
      }
    ]
    this.categories =[
      {id:1, name:"electo"},
      {id:2, name:"lab"},
      {id:3, name:"phone"}
    ] 
  }

  buy(price:number){
    this.selectedPrice=price;
  }
}
