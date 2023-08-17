import { OrderModel } from '@/models/order.model';

interface IDataOrderChangedToPaidEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;
}

export class OrderChangedToPaidEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;

  constructor(data: IDataOrderChangedToPaidEvent) {
    this.updatedBy = data.updatedBy;
    this.order = data.order;
  }
}
