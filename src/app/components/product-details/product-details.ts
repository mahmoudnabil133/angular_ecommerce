import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product-service';
import { catchError, distinctUntilChanged, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetail implements OnInit {
  product: any;
  loading = false;
  adding = false;
  added = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        distinctUntilChanged(),
        switchMap((id) => {
          this.loading = true;
          this.product = null;
          this.errorMessage = '';

          if (!id) {
            this.errorMessage = 'Invalid product link.';
            return of(null);
          }

          return this.productService.getById(id).pipe(
            catchError((err) => {
              this.errorMessage = err?.error?.message || 'Failed to load product details.';
              return of(null);
            })
          );
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          if (!this.errorMessage) this.errorMessage = 'No product data returned.';
          this.loading = false;
          return;
        }
        this.product = res?.doc || res?.result || res || null;
        if (!this.product) this.errorMessage = 'Product not found.';
        this.loading = false;
      });
  }

  addToCart() {
    if (!this.product?._id) return;
    this.adding = true;
    this.cartService.addProduct(this.product._id).subscribe({
      next: () => { this.adding = false; this.added = true; setTimeout(() => this.added = false, 2000); },
      error: () => { this.adding = false; }
    });
  }
}
