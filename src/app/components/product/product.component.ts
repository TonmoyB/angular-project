import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/model';

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

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product = {
        id: params['id'],
        name: params['name'],
        price: params['price'],
        image: params['image'],
        previousUrl: params['previousUrl']
      };

      const previousUrl = params['previousUrl'];
      this.previousTitle = this.extractPageName(previousUrl);
    });
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

}
