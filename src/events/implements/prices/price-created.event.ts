import { PriceModel } from '@/models/price.model';

interface IDataPriceCreatedEvent {
  readonly price: PriceModel;
}

export class PriceCreatedEvent {
  readonly price: PriceModel;

  constructor(data: IDataPriceCreatedEvent) {
    this.price = data.price;
  }
}
