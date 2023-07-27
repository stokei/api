export interface IBillingItemModelData {
  readonly price: string;
  readonly quantity: number;
  readonly total: number;
  readonly unitAmount: number;
}

export class BillingItemModel {
  readonly price: string;
  readonly quantity: number;
  readonly total: number;
  readonly unitAmount: number;

  constructor(data: IBillingItemModelData) {
    this.price = data.price;
    this.quantity = data.quantity || 0;
    this.total = data.total || 0;
    this.unitAmount = data.unitAmount || 0;
  }
}
