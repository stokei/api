import { BillingItemModel } from './billing-item.model';

export interface IBillingModelData {
  readonly items: BillingItemModel[];
  readonly total: number;
  readonly currency?: string;
}

export class BillingModel {
  readonly items: BillingItemModel[];
  readonly total: number;
  readonly currency?: string;

  constructor(data: IBillingModelData) {
    this.currency = data.currency;
    this.total = data.total || 0;
    this.items = data.items || [];
  }
}
