import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  subtotal: number = 100;
  discount: number = this.subtotal * 0.05;
  totalPrice: number = this.subtotal - this.discount;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.subtotal = parseFloat(params['subtotal']) || 0;
      this.discount = parseFloat(params['discount']) || 0;
      this.totalPrice = parseFloat(params['totalPrice']) || 0;
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const checkoutData = this.checkoutForm.value;
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

      localStorage.setItem(
        'checkoutData',
        JSON.stringify({
          user: loggedInUser.username,
          orderDetails: {
            ...checkoutData,
            subtotal: this.subtotal,
            discount: this.discount,
            totalPrice: this.totalPrice,
          },
        })
      );
      this.router.navigate(['/success']);
    } else {
      this.toastService.show("Please fillout all fields!", "error")
    }
  }
}
