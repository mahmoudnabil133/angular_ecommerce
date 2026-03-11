import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  slides: { imageUrl: string; title: string; description: string }[] = [];

  constructor() {
    // generate three random slides using picsum.photos
    for (let i = 1; i <= 3; i++) {
      this.slides.push({
        imageUrl: `https://picsum.photos/1200/400?random=${i}`,
        title: `Slide ${i} Label`,
        description: `Some representative placeholder content for slide ${i}.`,
      });
    }
  }
}
