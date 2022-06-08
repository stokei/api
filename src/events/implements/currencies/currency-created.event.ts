import { CurrencyModel } from '@/models/currency.model';

interface IDataCurrencyCreatedEvent {
  readonly currency: CurrencyModel;
}

export class CurrencyCreatedEvent {
  readonly currency: CurrencyModel;

  constructor(data: IDataCurrencyCreatedEvent) {
    this.currency = data.currency;
  }
}
