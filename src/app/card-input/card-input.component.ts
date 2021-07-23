import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentMethod} from '../data-objects/paymentMethod';
import {Address} from '../data-objects/address';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css']
})
export class CardInputComponent implements OnInit {

  cardForm;

  paymentMethod: PaymentMethod;

  iframeStyling = 'https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html?css='
    + '%2Eerror%7Bcolor%3A+red%3B%7Dinput%7Bwidth%3Acalc%28100%25-2px%29%3Bheight%3A24px%3Bpadding-top%3A6px%3Bpadding-bottom%3A6px%3Bborder%3A1px+solid+%23ced4da%3B%7Dbody%7Bmargin%3A0%3B%7D';

  constructor() { }

  ngOnInit(): void {
    this.paymentMethod = new PaymentMethod();
    this.paymentMethod.billingAddress = new Address();
    this.cardForm = new FormGroup({
      cardHolderName: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl('', []),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required])
    });
  }

  isFormValid(touch: boolean): boolean {
    if (this.cardForm.valid && this.paymentMethod.token && (this.paymentMethod.token.length > 0)) {
      return true;
    } else if (touch) {
      this.cardForm.markAllAsTouched();
      return false;
    } else {
      return false;
    }
  }

  getPaymentMethod(): PaymentMethod {
    this.paymentMethod.cardHolderName = this.cardForm.value.cardHolderName;
    this.paymentMethod.billingAddress.streetLine1 = this.cardForm.value.addressLine1;
    this.paymentMethod.billingAddress.streetLine2 = this.cardForm.value.addressLine2;
    this.paymentMethod.billingAddress.postalCode = this.cardForm.value.zipCode;
    this.paymentMethod.billingAddress.city = this.cardForm.value.city;
    this.paymentMethod.billingAddress.region = this.cardForm.value.state;
    return this.paymentMethod;
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (event && event.data) {
      try {
        const tokenMessage = JSON.parse(event.data);
        if (tokenMessage && tokenMessage.message) {
          this.paymentMethod.token = tokenMessage.message;
        }
      } catch (e) {
      }
    }
  }

}
