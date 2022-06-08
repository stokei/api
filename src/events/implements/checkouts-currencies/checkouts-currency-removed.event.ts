import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

interface IDataCheckoutsCurrencyRemovedEvent {
  readonly checkoutsCurrency: CheckoutsCurrencyModel;
}

export class CheckoutsCurrencyRemovedEvent {
  readonly checkoutsCurrency: CheckoutsCurrencyModel;

  constructor(data: IDataCheckoutsCurrencyRemovedEvent) {
    this.checkoutsCurrency = data.checkoutsCurrency;
  }
}
