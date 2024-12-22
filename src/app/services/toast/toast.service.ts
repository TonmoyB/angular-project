import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: { message: string; type: 'success' | 'error' | 'info' | 'warning' }[] = [];

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    this.toasts.push({ message, type });
    setTimeout(() => this.toasts.shift(), 3000);
  }

}
