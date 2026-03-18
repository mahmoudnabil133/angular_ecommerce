import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1),  Validators.pattern('^[0-9]+$')]),
    inStock: new FormControl(0, [Validators.required, Validators.min(0),  Validators.pattern('^[0-9]+$')])
  })

  /**
   *
   */
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  submet(){
    if(this.form.invalid) return;
    this.productService.createProduct(this.form.value)
    .subscribe(()=>{this.router.navigate(['/products'])})
  }
}
