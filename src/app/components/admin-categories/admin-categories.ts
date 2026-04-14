import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategories implements OnInit {
  categories: any[] = [];
  loading = false;
  saving = false;
  showModal = false;
  editId: string | null = null;
  formError = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (res: any) => { this.categories = res.docs; this.loading = false; }
    });
  }

  openCreate() {
    this.editId = null;
    this.form.reset();
    this.formError = '';
    this.showModal = true;
  }

  openEdit(c: any) {
    this.editId = c._id;
    this.form.patchValue({ name: c.name });
    this.formError = '';
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const obs = this.editId
      ? this.categoryService.update(this.editId, this.form.value)
      : this.categoryService.create(this.form.value);

    obs.subscribe({
      next: () => { this.saving = false; this.closeModal(); this.load(); },
      error: (err: { error: { message: string } }) => { this.formError = err.error?.message || 'Error'; this.saving = false; }
    });
  }

  delete(id: string) {
    if (!confirm('Delete this category?')) return;
    this.categoryService.delete(id).subscribe({ next: () => this.load() });
  }
}

