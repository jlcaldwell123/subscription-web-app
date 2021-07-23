import { Component, OnInit } from '@angular/core';
import {Transaction} from '../data-objects/transaction';
import {TransactionService} from '../services/transaction.service';

@Component({
  selector: 'app-payment-plans',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [TransactionService]
})
export class PaymentsComponent implements OnInit {

  displayModal;
  paymentMethods = ['Credit Card', 'ACH'];
  selectedTransaction;
  transactions: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.displayModal = false;
    this.retrieveTransactions();
  }

  retrieveTransactions() {
    this.transactionService.getTransactions()
      .subscribe(transactions => {
        this.transactions = transactions;
      });
  }

  openTransaction(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.displayModal = true;
  }

  newTransaction(): void {
    this.openTransaction(new Transaction());
  }

  closeModal(): void {
    this.displayModal = false;
  }

  saveTransaction(): void {
    const transaction = [this.selectedTransaction];
    if (this.selectedTransaction.id) {
      this.transactionService
        .updateTransactions(transaction)
        .subscribe(update => {
          this.retrieveTransactions();
          this.displayModal = false;
        });
    } else {
      this.transactionService
        .addTransactions(transaction)
        .subscribe(update => {
          this.retrieveTransactions();
          this.displayModal = false;
        });
    }
  }

  togglePaymentMethod(paymentMethod: string): void {
  }

}
