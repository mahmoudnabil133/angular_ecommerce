import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  error = '';
  loading = false;
  constructor(private auth:AuthService, private router:Router) {}
  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';
    this.auth.login(this.form.value as any).subscribe({
      next:()=>{
        this.auth.isAdmin() ? this.router.navigate(['/admin']) : this.router.navigate(['/products']);
      },
      error:(err: { error: { message: string } })=>{
        console.log(err);
        this.error = err.error?.message || 'Error';
        this.loading = false;
      } 
    });
  }
}
