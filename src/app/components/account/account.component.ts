import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isLogin: boolean = true; // Determines if login or register form is displayed
  loginForm: FormGroup; // Login form group
  registerForm: FormGroup; // Register form group

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize forms
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator } // Custom validator for matching passwords
    );
  }

  ngOnInit(): void { }

  switchToLogin(): void {
    this.isLogin = true;
  }

  switchToRegister(): void {
    this.isLogin = false;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(
        (u: { username: string; password: string }) =>
          u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        console.log('Login successful:', user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        this.router.navigate(['/checkout']);
      } else {
        alert('Invalid username or password. Please try again.');
      }
    } else {
      alert('Please fill in all the required fields.');
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.get('name')?.value,
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
      };

      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      const isUsernameTaken = existingUsers.some(
        (u: { username: string }) => u.username === user.username
      );

      if (isUsernameTaken) {
        alert('This username is already taken. Please choose a different username.');
        return;
      }

      existingUsers.push(user);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      localStorage.removeItem('loggedInUser');
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      console.log('Registration successful and user logged in:', user);
      alert('Registration successful. You are now logged in. Redirecting to checkout...');
      this.router.navigate(['/checkout']);
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
