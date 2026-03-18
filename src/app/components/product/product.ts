import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { identifierName } from '@angular/compiler';
import { FormsModule} from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../product-card/product-card';
import { RouterLink } from "@angular/router";
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
  imports: [CommonModule, FormsModule, ProductCard, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products?: IProduct[];
  categories:any[];
  selectedProducts?: IProduct[]=[]
  
  selectedPrice:number=0;
  selectedCatId:number=0;
  
  
  constructor(private productService: ProductService, private cd:ChangeDetectorRef){
    this.categories =[
      {id:1, name:"electo"},
      {id:2, name:"lab"},
      {id:3, name:"phone"}
    ] 
  } 
  ngOnInit(){
    this.getAll()
  }
  getAll(){
    this.productService.getAll().subscribe({
      next:res=>{
      this.products = res
      this.cd.detectChanges();
      }
    })
  }
  deleteProduct(id:string){
    const confirmDelete = confirm("Are you sure?")
    if (!confirmDelete) return;
    this.productService.delete(id).subscribe({
      next:()=>this.getAll(),
      error: err=>console.log(err)
    });
  }
  // ngAfterViewInit(): void {
  //   console.log('after init view init, now component is  loaded');
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //     console.log(changes);
      
  // }
  // ngOnDestroy(): void {
  //     console.log('destroy, now component is destroyed');
      
  // }
  
  // buy(price:number){
  //   this.selectedPrice=price;
  // }

  // filterProducts(){
  //   this.selectedProducts = this.selectedCatId == 0? this.products : this.products?.filter(p=>p.catId = this.selectedCatId)
  // }
}
