import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentPlan} from '../data-objects/paymentPlan';
import {PaymentPlanService} from '../services/paymentPlan.service';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../data-objects/customer';
import {SubscriptionService} from '../services/subscription.service';
import {CardInputComponent} from '../card-input/card-input.component';
import {Subscription} from '../data-objects/subscription';
import {MatStepper} from '@angular/material/stepper';
import * as _moment from 'moment';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [
    PaymentPlanService,
    CustomerService,
    SubscriptionService
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
  subscriptions;
  selectedDate;

  @ViewChild(CardInputComponent) cardInput: CardInputComponent;

  constructor(private paymentPlanService: PaymentPlanService, private customerService: CustomerService, private subscriptionService: SubscriptionService) { }

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
    this.subscriptionService.getSubscriptions()
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions;
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
    if (this.cardInput.isFormValid(false)) {
      const subscription = new Subscription();
      subscription.paymentMethod = this.cardInput.getPaymentMethod();
      subscription.contact = this.selectedCustomer;
      subscription.paymentPlan = this.selectedPaymentPlan;
      subscription.startDate = this.getStartDate();
      this.subscriptionService.addSubscriptions([subscription])
        .subscribe(update => {
          this.displayModal = false;
        });
    }
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

  selectPaymentPlan(paymentPlan: PaymentPlan, stepper: MatStepper): void {
    this.selectedPaymentPlan = paymentPlan;
    stepper.next();
  }

  selectCustomer(customer: Customer,  stepper: MatStepper): void {
    this.selectedCustomer = customer;
    stepper.next();
  }

  setDate(event: any, stepper: MatStepper): void {
    this.selectedDate = event;
    stepper.next();
  }

  getCard(): string {
    if (this.cardInput && this.cardInput.isFormValid(false)) {
      return this.cardInput.getPaymentMethod().token;
    } else {
      return 'Invalid Card Information';
    }
  }

  getStartDate(): string {
    return _moment(this.selectedDate, 'YYYY/MM/DD HH:mm:ss').toISOString();
  }

  isLastPage(stepper: MatStepper): boolean {
    return (stepper.selectedIndex === (stepper.steps.length - 1));
  }

  isSubscriptionComplete(): boolean {
    if (this.getStartDate() && this.selectedCustomer && this.selectedPaymentPlan && this.cardInput.isFormValid(false)) {
      return true;
    } else {
      return false;
    }
  }

  togglePaymentPlans(): void {
    this.paymentPlansExpanded = !this.paymentPlansExpanded;
  }

  toggleCustomers(): void {
    this.customersExpanded = !this.customersExpanded;
  }
}
