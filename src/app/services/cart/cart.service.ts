import { Injectable } from '@angular/core';
import { Product } from '../../models/model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartItems: { product: Product; quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
  cartCount: number = this.calculateCartCount();

  onCartChange: () => void = () => { };

  constructor() { }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    this.updateCart();
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  updateCartItem(product: Product, quantity: number): void {
    const item = this.cartItems.find(cartItem => cartItem.product.id === product.id);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(product.id);
      } else {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  updateCartItemQuantity(productId: string, quantity: number): void {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.updateCart(); // Persist changes to localStorage
    }
  }

  getCartItems(): { product: Product; quantity: number }[] {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartCount;
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartCount = this.calculateCartCount();

    if (this.onCartChange) {
      this.onCartChange();
    }
  }

  private calculateCartCount(): number {
    return this.cartItems.length;
  }
}
