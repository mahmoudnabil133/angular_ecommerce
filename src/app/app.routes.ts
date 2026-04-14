import { Routes } from '@angular/router';

// Public components
import { Product } from './components/product/product';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Cart } from './components/cart/cart';
import { Notfound } from './components/notfound/notfound';

// Admin

// Guards
import { AdminProducts } from './components/admin-products/admin-products';
import { AdminCategories } from './components/admin-categories/admin-categories';
import { ProductDetail } from './components/product-details/product-details';
import { adminGuard, authGuard, guestGuard } from './guards/auth-guard';
import { AdminLayout } from './components/admin-layout/admin-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // 🔓 Public
  { path: 'products', pathMatch: 'full', component: Product },
  { path: 'products/:id', component: ProductDetail },

  // 👤 Guest only
  { path: 'login', canActivate: [guestGuard], component: Login },
  { path: 'register', canActivate: [guestGuard], component: Register },

  // 🔐 Auth users
  { path: 'cart', canActivate: [authGuard], component: Cart },

  // 🛠 Admin
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    component: AdminLayout, // 👈 acts as layout (router-outlet inside)
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: AdminProducts },
      { path: 'categories', component: AdminCategories },
    ]
  },

  // ❌ Not found
  { path: '**', component: Notfound }
];