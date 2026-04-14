src/app/
├── app.ts                          ← Root (updated, simple layout)
├── app.routes.ts                   ← All routes with lazy loading
├── app.config.ts                   ← Providers + interceptor registration
│
├── guards/
│   └── auth.guard.ts               ← authGuard, adminGuard, guestGuard
│
├── interceptors/
│   └── auth.interceptor.ts         ← Auto-attaches Bearer token
│
├── services/
│   ├── auth.service.ts             ← login/logout/register/refresh + BehaviorSubject
│   ├── product.service.ts          ← CRUD with auth headers
│   ├── category.service.ts         ← CRUD with auth headers
│   └── cart.service.ts             ← add/remove/clear/get
│
└── components/
    ├── header/header.ts            ← Navbar: shows Admin menu if admin, cart if logged in
    ├── login/login.ts              ← Login form → redirects admin to /admin, user to /products
    ├── register/register.ts        ← Register form
    ├── product/product.ts          ← Public products grid with filter + pagination
    ├── product-detail/             ← Product detail with Add to Cart
    ├── cart/cart.ts                ← Cart page with remove/clear
    ├── notfound/notfound.ts
    └── admin/
        ├── admin-products/         ← Table + inline modal for create/edit/delete
        └── admin-categories/       ← Table + inline modal for create/edit/delete