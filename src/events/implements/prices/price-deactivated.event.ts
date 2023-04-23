import { PriceModel } from '@/models/price.model';

interface IDataPriceDeactivatedEvent {
  readonly updatedBy: string;
  readonly price: PriceModel;
}

export class PriceDeactivatedEvent {
  readonly updatedBy: string;
  readonly price: PriceModel;

  constructor(data: IDataPriceDeactivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.price = data.price;
  }
}
