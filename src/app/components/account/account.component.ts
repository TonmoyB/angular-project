import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/model';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { UserDetectionService } from 'src/app/services/userDetection/user-detection.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isLogin: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  showLoginPassword: boolean = false;
  showRegisterPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userDetectionService: UserDetectionService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {

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
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const checkout = params['checkoutButtonClicked'] === 'true';
      this.navigationService.setPreviousUrl(checkout ? '/checkout' : '/cart');
    });
  }

  toggleShowLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleShowRegisterPassword(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

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
        this.userDetectionService.setLoggedInUser(user);
        this.toastService.show('Login successful!', 'success');
        const previousUrl = this.navigationService.getPreviousUrl();
        this.router.navigate([previousUrl || '/']);
      } else {
        this.toastService.show('Invalid Username or Password', 'error');
      }
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
        this.toastService.show('Username already taken!', 'error');
        return;
      }

      existingUsers.push(user);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      this.userDetectionService.setLoggedInUser(user);
      console.log('Registration successful and user logged in:', user);
      this.toastService.show('Registration successful!', 'success');

      const previousUrl = this.navigationService.getPreviousUrl();
      this.router.navigate([previousUrl || '/']);
    }
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
