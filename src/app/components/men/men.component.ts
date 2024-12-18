import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  products = [
    {
      id: 1,
      name: 'Stylish Silver Necklace',
      price: 185.00,
      image: 'assets/product1.jpg'
    },
    {
      id: 2,
      name: 'Elegant Golden Ring',
      price: 210.00,
      image: 'assets/product2.jpg'
    },
    {
      id: 3,
      name: 'Classic Leather Bag',
      price: 120.00,
      image: 'assets/product3.jpg'
    },
    {
      id: 4,
      name: 'Fashionable Sunglasses',
      price: 99.00,
      image: 'assets/product4.jpg'
    },
    {
      id: 5,
      name: 'Luxury Watch',
      price: 450.00,
      image: 'assets/product5.jpg'
    }
  ];
}
