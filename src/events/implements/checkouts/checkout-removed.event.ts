import { CheckoutModel } from '@/models/checkout.model';

interface IDataCheckoutRemovedEvent {
  readonly checkout: CheckoutModel;
}

export class CheckoutRemovedEvent {
  readonly checkout: CheckoutModel;

  constructor(data: IDataCheckoutRemovedEvent) {
    this.checkout = data.checkout;
  }
}
