import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart/cart.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { UserDetectionService } from 'src/app/services/userDetection/user-detection.service';

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

  constructor(private cartService: CartService, private router: Router,
    private userDetectionService: UserDetectionService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.cartCount = this.cartService.cartCount;
    this.cartService.onCartChange = () => {
      this.cartCount = this.cartService.cartCount;
    };

    this.loggedInUser = this.userDetectionService.getLoggedInUser();
    this.userDetectionService.onUserChange(() => {
      this.loggedInUser = this.userDetectionService.getLoggedInUser();
    });
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
    alert('You have been logged out.');

  }

  navigateToAccount(): void {
    this.router.navigate(['/account']);
  }
}
