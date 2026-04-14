import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  products: any[] = [];
  loading = false;
  removingId: string | null = null;
  clearing = false;

  get total() {
    return this.products.reduce((s, p) => s + p.price, 0);
  }

  constructor(private cartService: CartService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.cartService.getMyCart().subscribe({
      next: (res: any) => { this.products = res.cart?.products || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  remove(id: string) {
    this.removingId = id;
    this.cartService.removeProduct(id).subscribe({
      next: (res: any) => { this.products = res.cart?.products || []; this.removingId = null; },
      error: () => { this.removingId = null; }
    });
  }

  clear() {
    if (!confirm('Clear entire cart?')) return;
    this.clearing = true;
    this.cartService.clearCart().subscribe({
      next: () => { this.products = []; this.clearing = false; },
      error: () => { this.clearing = false; }
    });
  }
}
