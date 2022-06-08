import { CheckoutModel } from '@/models/checkout.model';

interface IDataCheckoutUpdatedEvent {
  readonly checkout: CheckoutModel;
}

export class CheckoutUpdatedEvent {
  readonly checkout: CheckoutModel;

  constructor(data: IDataCheckoutUpdatedEvent) {
    this.checkout = data.checkout;
  }
}
