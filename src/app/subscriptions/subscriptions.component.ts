import { Component, OnInit } from '@angular/core';
import {PaymentPlan} from '../data-objects/paymentPlan';
import {PaymentPlanService} from '../services/paymentPlan.service';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../data-objects/customer';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [
    PaymentPlanService,
    CustomerService
  ]
})
export class SubscriptionsComponent implements OnInit {

  displayModal;
  paymentPlans: PaymentPlan[];
  customers: Customer[];
  availablePaymentPlans: PaymentPlan[];
  selectedPaymentPlan;
  selectedCustomer;
  paymentPlansExpanded;
  customersExpanded;

  constructor(private paymentPlanService: PaymentPlanService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.displayModal = false;
    this.paymentPlanService.getPaymentPlans()
      .subscribe(paymentPlans => {
        this.paymentPlans = paymentPlans;
      });
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      });
  }

  showModal(): void {
    this.displayModal = true;
    this.paymentPlansExpanded = false;
    this.availablePaymentPlans = this.paymentPlans;
  }

  closeModal(): void {
    this.displayModal = false;
  }

  saveSubscription(): void {
    this.displayModal = false;
  }

  filterPaymentPlans(input: any): void {
    const availablePaymentPlans = [];
    if (input.target.value) {
      for (const paymentPlan of this.paymentPlans) {
        if (paymentPlan.name.toUpperCase().indexOf(input.target.value.toUpperCase()) > -1) {
          availablePaymentPlans.push(paymentPlan);
        }
      }
      this.availablePaymentPlans = availablePaymentPlans;
    } else {
      this.availablePaymentPlans = this.paymentPlans;
    }
  }

  selectPaymentPlan(paymentPlan: PaymentPlan): void {
    this.selectedPaymentPlan = paymentPlan;
    this.togglePaymentPlans();
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.toggleCustomers();
  }

  togglePaymentPlans(): void {
    this.paymentPlansExpanded = !this.paymentPlansExpanded;
  }

  toggleCustomers(): void {
    this.customersExpanded = !this.customersExpanded;
  }
}
