import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private router: Router, private cartService: CartService) { }

  navigateToProduct(product: Product) {
    this.router.navigate(['/product', product.id], {
      queryParams: {
        name: product.name,
        price: product.price,
        image: product.image,
        previousUrl: this.router.url
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.name} has been added to your cart.`);
  }

  ngOnInit(): void {
    if (this.router.url === '/men') {
      this.products = this.menProducts;
    } else if (this.router.url === '/women') {
      this.products = this.womenProducts;
    } else {
      this.products = this.allProducts;
    }
  }

  menProducts = [
    {
      id: "1",
      name: 'Souls Diamond',
      price: 185.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: "2",
      name: 'Elegant Golden Ring',
      price: 210.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: "3",
      name: 'Classic Leather Bag',
      price: 120.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: '4',
      name: 'Fashionable Sunglasses',
      price: 99.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: "5",
      name: 'Classic Leather Bag',
      price: 120.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: '6',
      name: 'Fashionable Sunglasses',
      price: 99.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: "7",
      name: 'Classic Leather Bag',
      price: 120.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: '8',
      name: 'Fashionable Sunglasses',
      price: 99.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    }

  ];

  womenProducts = [
    {
      id: "1",
      name: 'Souls Diamond',
      price: 185.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: "2",
      name: 'Elegant Golden Ring',
      price: 210.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: "3",
      name: 'Classic Leather Bag',
      price: 120.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    },
    {
      id: '4',
      name: 'Fashionable Sunglasses',
      price: 99.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    }
  ];

  allProducts = [
    {
      id: "1",
      name: 'Souls Diamond',
      price: 185.00,
      image: '../../../assets/Symphony Of Souls Diamond Engagement Ring For Men.png'
    }
  ]
}
