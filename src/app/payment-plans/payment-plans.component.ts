import { Component, OnInit } from '@angular/core';
import {PaymentPlan} from '../data-objects/paymentPlan';
import {PaymentPlanService} from '../services/paymentPlan.service';

@Component({
  selector: 'app-payment-plans',
  templateUrl: './payment-plans.component.html',
  styleUrls: ['./payment-plans.component.css'],
  providers: [PaymentPlanService]
})
export class PaymentPlansComponent implements OnInit {

  displayModal;
  paymentMethods = ['Credit Card', 'ACH'];
  selectedPaymentPlan;
  paymentPlans: PaymentPlan[];

  constructor(private paymentPlanService: PaymentPlanService) { }

  ngOnInit(): void {
    this.displayModal = false;
    this.retrievePaymentPlanData();
  }

  retrievePaymentPlanData() {
    this.paymentPlanService.getPaymentPlans()
      .subscribe(paymentPlans => {
        this.paymentPlans = paymentPlans;
      });
  }

  openPaymentPlan(paymentPlan: PaymentPlan): void {
    this.selectedPaymentPlan = paymentPlan;
    this.displayModal = true;
  }

  newPaymentPlan(): void {
    this.openPaymentPlan(new PaymentPlan());
  }

  closeModal(): void {
    this.displayModal = false;
  }

  savePaymentPlan(): void {
    const paymentPlans = [this.selectedPaymentPlan];
    if (this.selectedPaymentPlan.id) {
      this.paymentPlanService
        .updatePaymentPlan(paymentPlans)
        .subscribe(update => {
          this.retrievePaymentPlanData();
          this.displayModal = false;
        });
    } else {
      this.paymentPlanService
        .addPaymentPlans(paymentPlans)
        .subscribe(update => {
          this.retrievePaymentPlanData();
          this.displayModal = false;
        });
    }
  }

  togglePaymentMethod(paymentMethod: string): void {
  }

}
