import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ForgotpassComponent } from './auth/components/forgotpass/forgotpass.component';
import { VerifypassComponent } from './auth/components/verifypass/verifypass.component';
import { BillinglistComponent } from './billinglist/billinglist.component';
import { NewcheckoutComponent } from './newcheckout/newcheckout.component';
import { AddressmodelComponent } from './addressmodel/addressmodel.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'login', component: LoginComponent,
    title: 'Login',
    loadComponent: () => import('./auth/components/login/login.component').then(mod => mod.LoginComponent)

  },
  {
    path: 'register', component: RegisterComponent,
    title: 'Register',
    loadComponent: () => import('./auth/components/register/register.component').then(mod => mod.RegisterComponent)
  },
  {
    path: 'forgotpass', component: ForgotpassComponent,
    title: 'FogotPassword',
    loadComponent: () => import('./auth/components/forgotpass/forgotpass.component').then(mod => mod.ForgotpassComponent)
  },
  {
    path: 'verifypass', component: VerifypassComponent,
    title: 'NewPassword',
    loadComponent: () => import('./auth/components/verifypass/verifypass.component').then(mod => mod.VerifypassComponent)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    title: 'UpdateProfile',
    loadComponent: () => import('./profile/profile.component').then(mod => mod.ProfileComponent)

  },
  {
    path: 'product/:id', component: ProductComponent,

  },
  {
    path: 'cart', component: CartComponent,
    title: 'Add To Cart'
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuardService],
    title: 'Checkout',
    loadComponent: () => import('./checkout/checkout.component').then(mod => mod.CheckoutComponent)

  },
  {
    path: 'newcheckout',
    component: NewcheckoutComponent,
    title: 'Checkout',

  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuardService],
    title: 'OrderList',
    loadComponent: () => import('./order-history/order-history.component').then(mod => mod.OrderHistoryComponent)
  },
  {
    path: 'order-details/:orderid',
    component: OrderDetailsComponent,
    title: 'OrderDetail',
  },

  {
    path: 'billinglist',
    component: BillinglistComponent,
    canActivate: [AuthGuardService],
    title: 'Address List',
    // loadComponent: () => import('./billinglist/billinglist.component').then(mod => mod.BillinglistComponent)
  },
  {
    path: 'addressmodel',
    component: AddressmodelComponent,
    title: 'ADD Address'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
