import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit{
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1),  Validators.pattern('^[0-9]+$')]),
    inStock: new FormControl(0, [Validators.required, Validators.min(0),  Validators.pattern('^[0-9]+$')])
  })

  id!:string;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {} 
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadProduct()
  }
  submet(){
    if(this.form.invalid) return;
    this.productService.update(this.id, this.form.value)
    .subscribe(()=>{this.router.navigate(['/products'])})
  }
  loadProduct() {
    this.productService.getById(this.id).subscribe({
      next: (res:any) => {
        console.log(res);
        this.form.patchValue({
          name: res.name,
          price: res.price,
          inStock: res.inStock
        });
      },
      error: err => console.log(err)
    });
  }


}
