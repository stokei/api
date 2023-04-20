import { PriceModel } from '@/models/price.model';

interface IDataPriceActivatedEvent {
  readonly updatedBy: string;
  readonly price: PriceModel;
}

export class PriceActivatedEvent {
  readonly updatedBy: string;
  readonly price: PriceModel;

  constructor(data: IDataPriceActivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.price = data.price;
  }
}
