import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartItems: { product: Product; quantity: number }[] = [];
  subtotal: number = 0;
  discount: number = 0;
  totalPrice: number = 0;
  checkoutButtonClicked: boolean = false;
  readonly DISCOUNT_RATE: number = 0.05;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculatePrices();
  }

  private calculatePrices(): void {
    this.subtotal = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.discount = this.subtotal * this.DISCOUNT_RATE;
    this.totalPrice = this.subtotal - this.discount;
  }

  incrementQuantity(productId: string): void {
    this.cartService.updateCartItemQuantity(productId, this.getQuantity(productId) + 1);
    this.loadCart();
  }

  decrementQuantity(productId: string): void {
    const currentQuantity = this.getQuantity(productId);
    if (currentQuantity > 1) {
      this.cartService.updateCartItemQuantity(productId, currentQuantity - 1);
    } else {
      this.removeItem(productId);
    }
    this.loadCart();
  }

  onQuantityChange(product: Product, quantityValue: string): void {
    const quantity = Math.max(parseInt(quantityValue, 10) || 1, 1);
    this.cartService.updateCartItemQuantity(product.id, quantity);
    this.loadCart();
  }

  onQuantityInput(product: Product, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);

    if (quantity > 0) {
      this.cartService.updateCartItemQuantity(product.id, quantity);
      this.loadCart();
    } else {
      inputElement.value = '1';
      this.cartService.updateCartItemQuantity(product.id, 1);
      this.loadCart();
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  goToCheckout(): void {
    this.checkoutButtonClicked = true;
    this.router.navigate(['/account'], { queryParams: { checkoutButtonClicked: 'true' } });
  }

  navigateToAccount(): void {
    this.checkoutButtonClicked = false;
    this.router.navigate(['/account'], { queryParams: { checkoutButtonClicked: 'true' } });
  }

  private getQuantity(productId: string): number {
    const item = this.cartItems.find(cartItem => cartItem.product.id === productId);
    return item ? item.quantity : 0;
  }
}
