import { PriceModel } from '@/models/price.model';

interface IDataPriceCreatedEvent {
  readonly createdBy: string;
  readonly defaultPrice?: boolean;
  readonly price: PriceModel;
}

export class PriceCreatedEvent {
  readonly createdBy: string;
  readonly defaultPrice?: boolean;
  readonly price: PriceModel;

  constructor(data: IDataPriceCreatedEvent) {
    this.createdBy = data.createdBy;
    this.defaultPrice = data.defaultPrice;
    this.price = data.price;
  }
}
