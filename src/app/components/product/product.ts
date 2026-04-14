import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../product-card/product-card';


@Component({
  selector: 'app-product',
  imports: [CommonModule, ProductCard],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productService.getAll().subscribe({
      next: (res: any) => {
        this.products = Array.isArray(res?.docs) ? res.docs : [];
      },
    });
  }

  productId(item: IProduct): string {
    return item?._id || item?.id || '';
  }

  goToDetails(item: IProduct): void {
    const id = this.productId(item);
    if (!id) return;
    this.router.navigate(['/products', id]);
  }
}
