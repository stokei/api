import { PriceModel } from '@/models/price.model';

interface IDataPriceRemovedEvent {
  readonly removedBy: string;
  readonly price: PriceModel;
}

export class PriceRemovedEvent {
  readonly removedBy: string;
  readonly price: PriceModel;

  constructor(data: IDataPriceRemovedEvent) {
    this.removedBy = data.removedBy;
    this.price = data.price;
  }
}
