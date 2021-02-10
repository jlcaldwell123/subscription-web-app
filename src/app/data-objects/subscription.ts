import {PaymentMethod} from './paymentMethod';
import {PaymentPlan} from './paymentPlan';
import {Contact} from './contact';

export class Subscription {
  id?: string;
  paymentMethod?: PaymentMethod;
  paymentPlan?: PaymentPlan;
  contact?: Contact;
}
