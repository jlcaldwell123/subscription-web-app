import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {PaymentPlansComponent} from './payment-plans/payment-plans.component';
import {CustomersComponent} from './customers/customers.component';
import {PaymentsComponent} from './payments/payments.component';


const routes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'payment-plans',
    component: PaymentPlansComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
