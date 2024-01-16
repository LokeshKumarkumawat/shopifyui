import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent  implements OnInit{


  currentSlide = 0;
  items = [
    { image: 'https://i.ibb.co/ZmMNt8N/1.jpg', caption: 'Image 1' },
    { image: 'https://i.ibb.co/rxrK1XC/3.jpg', caption: 'Image 1' },
    { image: 'https://i.ibb.co/D8p0f59/2.jpg', caption: 'Image 1' },

  ];

  constructor() {}

  ngOnInit() {
    this.autoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.items.length - 1;
  }

  autoSlide() {
    setInterval(() => this.nextSlide(), 5000); // Change slide every 5 seconds
  }

}
