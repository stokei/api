import { CheckoutModel } from '@/models/checkout.model';

interface IDataCheckoutCreatedEvent {
  readonly checkout: CheckoutModel;
}

export class CheckoutCreatedEvent {
  readonly checkout: CheckoutModel;

  constructor(data: IDataCheckoutCreatedEvent) {
    this.checkout = data.checkout;
  }
}
