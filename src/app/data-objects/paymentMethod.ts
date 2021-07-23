import {Address} from './address';

export class PaymentMethod {
  id?: string;
  token?: string;
  tokenType?: string;
  expirationDate?: string;
  cardHolderName?: string;
  billingAddress?: Address;
  cvv?: string;
}
