import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

interface IDataCheckoutsCurrencyCreatedEvent {
  readonly checkoutsCurrency: CheckoutsCurrencyModel;
}

export class CheckoutsCurrencyCreatedEvent {
  readonly checkoutsCurrency: CheckoutsCurrencyModel;

  constructor(data: IDataCheckoutsCurrencyCreatedEvent) {
    this.checkoutsCurrency = data.checkoutsCurrency;
  }
}
