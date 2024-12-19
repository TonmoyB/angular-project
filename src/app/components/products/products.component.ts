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
  originalProducts: Product[] = [];

  constructor(private router: Router, private cartService: CartService) { }
  ngOnInit(): void {
    this.checkLink();
  }

  checkLink(): void {
    if (this.router.url === '/men') {
      this.originalProducts = this.menProducts;
    } else if (this.router.url === '/women') {
      this.originalProducts = this.womenProducts;
    } else {
      this.originalProducts = this.allProducts;
    }
    this.products = [...this.originalProducts];
  }

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

  onSortChange(event: Event) {
    const sortBy = (event.target as HTMLSelectElement).value;

    if (sortBy === 'default') {
      this.products = [...this.originalProducts];
    } else if (sortBy === 'priceLowHigh') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighLow') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'nameAZ') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameZA') {
      this.products.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  menProducts = [
    {
      id: "1",
      name: 'Souls Diamond',
      price: 185.00,
      image: '../../../assets/men/Symphony Of Souls Diamond Engagement Ring For Men.png',
      type: 'ring'
    },
    {
      id: "2",
      name: 'Contemporary Matte',
      price: 210.00,
      image: '../../../assets/men/Contemporary Matte Finger Ring.png',
      type: 'ring'
    },
    {
      id: "3",
      name: 'Divine Pavanputra',
      price: 120.00,
      image: '../../../assets/men/Divine Pavanputra Pendant.png',
      type: 'pendant'
    },
    {
      id: '4',
      name: 'Dynamic Edge',
      price: 99.00,
      image: '../../../assets/men/Dynamic Edge Finger Ring.png',
      type: 'ring'
    },
    {
      id: "5",
      name: 'Elegant Criss Cross',
      price: 120.00,
      image: '../../../assets/men/Elegant Criss Cross Gold Chain.png',
      type: 'chain'
    },
    {
      id: '6',
      name: 'Elegant Gold Chain',
      price: 99.00,
      image: '../../../assets/men/Elegant Gold Chain.png',
      type: 'chain'
    },
    {
      id: "7",
      name: 'Grided Glitz',
      price: 120.00,
      image: '../../../assets/men/Grided Glitz Gold & Diamond.png',
      type: 'ring'
    },
    {
      id: '8',
      name: 'Lumos Diamond Ring',
      price: 99.00,
      image: '../../../assets/men/Lumos Diamond Ring.png',
      type: 'ring'
    },
    {
      id: "9",
      name: `Luxurious Mens' Chain`,
      price: 185.00,
      image: `../../../assets/men/Luxurious Men's Gold Chain.png`,
      type: 'chain'
    },
    {
      id: "10",
      name: `Maze Mens' Gold Ring`,
      price: 210.00,
      image: `../../../assets/men/Maze Men's Gold Finger Ring.png`,
      type: 'ring'
    },
    {
      id: "11",
      name: 'Minimalistic Mesmerising',
      price: 120.00,
      image: '../../../assets/men/Minimalistic Mesmerising.png',
      type: 'ring'
    },
    {
      id: '12',
      name: 'Minimalistic Platimun',
      price: 99.00,
      image: '../../../assets/men/Minimalistic Platinum Finger Ring.png',
      type: 'ring'
    },
    {
      id: "13",
      name: `Sculpted Mens' Gold Ring`,
      price: 120.00,
      image: `../../../assets/men/Sculpted Men's Gold Finger Ring.png`,
      type: 'ring'
    },
    {
      id: '14',
      name: 'Sleek Platinum Chain',
      price: 99.00,
      image: '../../../assets/men/Sleek Platinum Chain.png',
      type: 'chain'
    },
    {
      id: "15",
      name: `Structured Mens'`,
      price: 120.00,
      image: '../../../assets/men/Structured Mens Diamond Finger Ring.png',
      type: 'ring'
    },
    {
      id: '16',
      name: 'Stunning Geometric',
      price: 99.00,
      image: '../../../assets/men/Stunning Geometric Gold Ring for Men.png',
      type: 'ring'
    },
    {
      id: '17',
      name: 'Timeless Statement.png',
      price: 99.00,
      image: '../../../assets/men/Timeless Statement Gold Chain.png',
      type: 'chain'
    },
    {
      id: '18',
      name: 'Rudraksh Bracelet.png',
      price: 99.00,
      image: '../../../assets/men/Unique Om Rudraksh Bracelet.png',
      type: 'bracelet'
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
