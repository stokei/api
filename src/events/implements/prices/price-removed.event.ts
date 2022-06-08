import { PriceModel } from '@/models/price.model';

interface IDataPriceRemovedEvent {
  readonly price: PriceModel;
}

export class PriceRemovedEvent {
  readonly price: PriceModel;

  constructor(data: IDataPriceRemovedEvent) {
    this.price = data.price;
  }
}
