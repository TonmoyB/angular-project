import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navItems = [
    { label: 'HOME', link: '/', exact: true },
    { label: 'MEN', link: '/men', exact: false },
    { label: 'WOMEN', link: '/women', exact: false },
    { label: 'COLLECTION', link: '/collection', exact: false },
    { label: 'CONTACT', link: '/contact', exact: false }
  ];
  cartCount: number = 0;
  menuOpen: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartCount = this.cartService.cartCount;
    this.cartService.onCartChange = () => {
      this.cartCount = this.cartService.cartCount;
    };
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
