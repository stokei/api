import { PriceModel } from '@/models/price.model';

interface IDataPriceUpdatedEvent {
  readonly updatedBy: string;
  readonly price: PriceModel;
}

export class PriceUpdatedEvent {
  readonly updatedBy: string;
  readonly price: PriceModel;

  constructor(data: IDataPriceUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.price = data.price;
  }
}
