import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading = false;
  saving = false;
  showModal = false;
  editId: string | null = null;
  formError = '';
  page = 1;
  pages = 1;
  pageArr: number[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    inStock: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoryId: new FormControl('', [Validators.required]),
    image: new FormControl('')
  });

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.load();
    this.categoryService.getAll().subscribe({ next: (res: any) => this.categories = res.docs });
  }

  load() {
    this.loading = true;
    this.productService.getAll({ page: this.page, limit: 10 }).subscribe({
      next: (res: any) => {
        this.products = res.docs;
        this.pages = res.pages;
        this.pageArr = Array.from({ length: this.pages }, (_, i) => i + 1);
        this.loading = false;
      }
    });
  }

  goTo(p: number) { this.page = p; this.load(); }

  openCreate() {
    this.editId = null;
    this.form.reset({ price: 0, inStock: 0 });
    this.formError = '';
    this.showModal = true;
  }

  openEdit(p: any) {
    this.editId = p._id;
    this.form.patchValue({ name: p.name, price: p.price, inStock: p.inStock, categoryId: p.categoryId?._id || '', image: p.image || '' });
    this.formError = '';
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.formError = '';
    const obs = this.editId
      ? this.productService.update(this.editId, this.form.value)
      : this.productService.createProduct(this.form.value);

    obs.subscribe({
      next: () => { this.saving = false; this.closeModal(); this.load(); },
      error: (err) => { this.formError = err.error?.message || 'Error'; this.saving = false; }
    });
  }

  delete(id: string) {
    if (!confirm('Delete this product?')) return;
    this.productService.delete(id).subscribe({ next: () => this.load() });
  }
}
