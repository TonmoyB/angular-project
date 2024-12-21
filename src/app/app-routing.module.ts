import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ProductComponent } from "./components/product/product.component";
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'men', component: ProductsComponent
  },
  {
    path: 'women', component: ProductsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'collection', component: ProductsComponent
  },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
  },
  {
    path: 'account', component: AccountComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
