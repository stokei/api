import { CurrencyModel } from '@/models/currency.model';

interface IDataCurrencyRemovedEvent {
  readonly removedBy: string;
  readonly currency: CurrencyModel;
}

export class CurrencyRemovedEvent {
  readonly removedBy: string;
  readonly currency: CurrencyModel;

  constructor(data: IDataCurrencyRemovedEvent) {
    this.removedBy = data.removedBy;
    this.currency = data.currency;
  }
}
