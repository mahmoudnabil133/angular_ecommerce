import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product } from './components/product/product';
import { Slider } from './components/slider/slider';
import { Contact } from './components/contact/contact';
import { Notfound } from './components/notfound/notfound';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Slider },
    { path: 'products', component: Product },
    { path: 'contact', component: Contact },
    { path: '**', component: Notfound }
];
