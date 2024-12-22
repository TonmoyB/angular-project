import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  ngOnInit(): void {
  }

  subtotal: number = 100;
  discount: number = this.subtotal * 0.05;
  totalPrice: number = this.subtotal - this.discount;

  constructor(private router: Router) { }

  onSubmit(): void {
    alert('Order completed successfully!');
    this.router.navigate(['/success']);
  }
}
