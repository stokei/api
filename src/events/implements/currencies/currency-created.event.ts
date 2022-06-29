import { CurrencyModel } from '@/models/currency.model';

interface IDataCurrencyCreatedEvent {
  readonly createdBy: string;
  readonly currency: CurrencyModel;
}

export class CurrencyCreatedEvent {
  readonly createdBy: string;
  readonly currency: CurrencyModel;

  constructor(data: IDataCurrencyCreatedEvent) {
    this.createdBy = data.createdBy;
    this.currency = data.currency;
  }
}
