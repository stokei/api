import { PriceTierModel } from '@/models/price-tier.model';

interface IDataPriceTierUpdatedEvent {
  readonly updatedBy: string;
  readonly priceTier: PriceTierModel;
}

export class PriceTierUpdatedEvent {
  readonly updatedBy: string;
  readonly priceTier: PriceTierModel;

  constructor(data: IDataPriceTierUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.priceTier = data.priceTier;
  }
}
