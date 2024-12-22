import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private lastRoute: string | null = null;

  constructor(private router: Router) { }

  saveCurrentRoute(): void {
    this.lastRoute = this.router.url;
  }

  getSavedRoute(): string | null {
    const route = this.lastRoute;
    this.lastRoute = null;
    return route;
  }
}
