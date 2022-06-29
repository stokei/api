import { PriceModel } from '@/models/price.model';

interface IDataPriceCreatedEvent {
  readonly createdBy: string;
  readonly price: PriceModel;
}

export class PriceCreatedEvent {
  readonly createdBy: string;
  readonly price: PriceModel;

  constructor(data: IDataPriceCreatedEvent) {
    this.createdBy = data.createdBy;
    this.price = data.price;
  }
}
