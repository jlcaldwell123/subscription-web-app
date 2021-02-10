import { Component, OnInit } from '@angular/core';
import {PaymentPlan} from '../data-objects/paymentPlan';
import {Customer} from '../data-objects/customer';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomerService]
})
export class CustomersComponent implements OnInit {

  displayModal;
  selectedCustomer;
  customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.displayModal = false;
    this.retrieveCustomerData();
  }

  retrieveCustomerData() {
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      });
  }

  openCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.displayModal = true;
  }

  newCustomer(): void {
    this.openCustomer(new Customer());
  }

  closeModal(): void {
    this.displayModal = false;
  }

  saveCustomer(): void {
    const customer = [this.selectedCustomer];
    if (this.selectedCustomer.id) {
      this.customerService
        .updateCustomers(customer)
        .subscribe(update => {
          this.retrieveCustomerData();
          this.displayModal = false;
        });
    } else {
      this.customerService
        .addCustomers(customer)
        .subscribe(update => {
          this.retrieveCustomerData();
          this.displayModal = false;
        });
    }
  }

  togglePaymentMethod(paymentMethod: string): void {
  }

}
