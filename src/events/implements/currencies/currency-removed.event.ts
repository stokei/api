import { CurrencyModel } from '@/models/currency.model';

interface IDataCurrencyRemovedEvent {
  readonly currency: CurrencyModel;
}

export class CurrencyRemovedEvent {
  readonly currency: CurrencyModel;

  constructor(data: IDataCurrencyRemovedEvent) {
    this.currency = data.currency;
  }
}
