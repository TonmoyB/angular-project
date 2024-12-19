import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product: Product = {
    id: "",
    name: "",
    price: 0,
    image: "",
    previousUrl: ""
  }

  previousTitle: string = ""
  quantity: number = 1;
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute, private location: Location, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product = {
        id: params['id'],
        name: params['name'],
        price: params['price'],
        image: params['image'],
        previousUrl: params['previousUrl']
      };
      console.log(this.product.id);

      const previousUrl = params['previousUrl'];
      this.previousTitle = this.extractPageName(previousUrl);
      this.totalPrice = this.product.price;
    });
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updatePrice();
    }
  }

  increaseQuantity(): void {
    this.quantity++;
    this.updatePrice();
  }

  updatePrice(): void {
    this.totalPrice = this.product.price * this.quantity;
  }

  onQuantityInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const parsedValue = parseInt(input, 10);
    this.quantity = isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
    this.updatePrice();
  }

  onQuantityChange(): void {
    if (this.quantity < 1) {
      this.quantity = 1;
      this.updatePrice();
    }
  }
  extractPageName(url: string): string {
    if (url) {
      return url.slice(1).toUpperCase();
    }
    return "Back";
  }

  goBack(): void {
    this.location.back();
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    alert(`${this.product.name} has been added to your cart.`);
  }

}
