import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.clearCart();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
