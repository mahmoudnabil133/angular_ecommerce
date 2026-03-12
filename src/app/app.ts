import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Product } from './components/product/product';
import { Slider } from './components/slider/slider';
import { Contact } from './components/contact/contact';
import { Notfound } from './components/notfound/notfound';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Product, Slider, Contact, Notfound, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('day1_ecomerce');
} 
