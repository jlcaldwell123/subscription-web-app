import {PaymentMethod} from './paymentMethod';
import {Authorization} from './authorization';


export class Transaction {
  id?: string;
  amount?: string;
  authorization?: Authorization;
  currency?: string;
  merchantId?: string;
  paymentMethod?: PaymentMethod;
}
