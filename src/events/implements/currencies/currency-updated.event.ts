import { CurrencyModel } from '@/models/currency.model';

interface IDataCurrencyUpdatedEvent {
  readonly currency: CurrencyModel;
}

export class CurrencyUpdatedEvent {
  readonly currency: CurrencyModel;

  constructor(data: IDataCurrencyUpdatedEvent) {
    this.currency = data.currency;
  }
}
