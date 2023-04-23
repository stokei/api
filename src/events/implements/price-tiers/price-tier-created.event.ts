import { PriceTierModel } from '@/models/price-tier.model';

interface IDataPriceTierCreatedEvent {
  readonly createdBy: string;
  readonly priceTier: PriceTierModel;
}

export class PriceTierCreatedEvent {
  readonly createdBy: string;
  readonly priceTier: PriceTierModel;

  constructor(data: IDataPriceTierCreatedEvent) {
    this.createdBy = data.createdBy;
    this.priceTier = data.priceTier;
  }
}
