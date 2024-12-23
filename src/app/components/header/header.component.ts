import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, User } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart/cart.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserDetectionService } from 'src/app/services/userDetection/user-detection.service';
import { SearchService } from 'src/app/services/search/search.service';

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
  loggedInUser: User = { name: "", username: "", password: "" };
  dropdownOpen: boolean = false;
  searchControl = new FormControl('');
  searchFocused = false;
  searchResults: Product[] = [];
  searchTimeout: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private userDetectionService: UserDetectionService,
    private navigationService: NavigationService,
    private toastService: ToastService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.cartCount = this.cartService.cartCount;
    this.cartService.onCartChange = () => {
      this.cartCount = this.cartService.cartCount;
    };

    this.loggedInUser = this.userDetectionService.getLoggedInUser();
    this.userDetectionService.onUserChange(() => {
      this.loggedInUser = this.userDetectionService.getLoggedInUser();
    });

    this.searchControl.valueChanges.subscribe((query) => {
      this.handleSearch(query);
    });
  }

  handleSearch(query: string): void {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      if (query.trim() === '') {
        this.searchResults = [];
        return;
      }

      this.searchService.search(query).then((results) => {
        this.searchResults = results;
      });
    }, 300);
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.user-dropdown');

    if (this.dropdownOpen && dropdown && !dropdown.contains(target)) {
      this.dropdownOpen = false;
    }
  }

  logout(): void {
    const currentUrl = this.router.url;
    this.navigationService.setPreviousUrl(currentUrl);
    this.userDetectionService.logout();
    this.dropdownOpen = false;
    this.toastService.show('Logout Successfull!', 'success');
  }

  navigateToAccount(): void {
    this.router.navigate(['/account']);
  }

  navigateToProduct(product: Product): void {
    console.log("Navigating to product:", product);
    if (product && product.id) {
      this.router.navigate(['/product', product.id], {
        queryParams: {
          name: product.name,
          price: product.price,
          image: product.image,
          previousUrl: this.router.url
        }
      });
    } else {
      console.error("Product data is invalid:", product);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const isInsideSearchContainer = target.closest('.search-container');

    if (!isInsideSearchContainer) {
      this.searchFocused = false;
      this.searchControl.setValue('');
      this.searchResults = [];
    }
  }
}
