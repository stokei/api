import { PriceTierModel } from '@/models/price-tier.model';

interface IDataPriceTierRemovedEvent {
  readonly removedBy: string;
  readonly priceTier: PriceTierModel;
}

export class PriceTierRemovedEvent {
  readonly removedBy: string;
  readonly priceTier: PriceTierModel;

  constructor(data: IDataPriceTierRemovedEvent) {
    this.removedBy = data.removedBy;
    this.priceTier = data.priceTier;
  }
}
