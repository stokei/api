import { CurrencyModel } from '@/models/currency.model';

interface IDataCurrencyUpdatedEvent {
  readonly updatedBy: string;
  readonly currency: CurrencyModel;
}

export class CurrencyUpdatedEvent {
  readonly updatedBy: string;
  readonly currency: CurrencyModel;

  constructor(data: IDataCurrencyUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.currency = data.currency;
  }
}
