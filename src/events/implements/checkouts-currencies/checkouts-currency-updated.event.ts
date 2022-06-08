import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

interface IDataCheckoutsCurrencyUpdatedEvent {
  readonly checkoutsCurrency: CheckoutsCurrencyModel;
}

export class CheckoutsCurrencyUpdatedEvent {
  readonly checkoutsCurrency: CheckoutsCurrencyModel;

  constructor(data: IDataCheckoutsCurrencyUpdatedEvent) {
    this.checkoutsCurrency = data.checkoutsCurrency;
  }
}
