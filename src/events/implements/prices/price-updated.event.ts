import { PriceModel } from '@/models/price.model';

interface IDataPriceUpdatedEvent {
  readonly price: PriceModel;
}

export class PriceUpdatedEvent {
  readonly price: PriceModel;

  constructor(data: IDataPriceUpdatedEvent) {
    this.price = data.price;
  }
}
