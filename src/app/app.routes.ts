import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product } from './components/product/product';
import { Slider } from './components/slider/slider';
import { Contact } from './components/contact/contact';
import { Notfound } from './components/notfound/notfound';
import { CreateProduct } from './components/create-product/create-product';
import { UpdateProduct } from './components/update-product/update-product';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Slider },
    { path: 'products', component: Product },
    { path: 'contact', component: Contact },
    { path: 'create-product', component: CreateProduct },
    { path: 'update-product/:id', component: UpdateProduct },
    { path: '**', component: Notfound }
];
