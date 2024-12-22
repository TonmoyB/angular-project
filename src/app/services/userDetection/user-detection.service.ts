import { Injectable } from '@angular/core';
import { User } from 'src/app/models/model';

@Injectable({
  providedIn: 'root'
})
export class UserDetectionService {

  private loggedInUser: User = { name: "", username: "", password: "" };
  private userChangeCallback: (() => void) | null = null;

  constructor() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }
  }

  getLoggedInUser(): User {
    return this.loggedInUser;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    if (this.userChangeCallback) {
      this.userChangeCallback();
    }
  }

  logout(): void {
    this.loggedInUser = { name: "", username: "", password: "" };
    localStorage.removeItem('loggedInUser');
    if (this.userChangeCallback) {
      this.userChangeCallback();
    }
  }

  onUserChange(callback: () => void): void {
    this.userChangeCallback = callback;
  }
}
