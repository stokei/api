import { OrderModel } from '@/models/order.model';

interface IDataOrderChangedToPendingEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;
}

export class OrderChangedToPendingEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;

  constructor(data: IDataOrderChangedToPendingEvent) {
    this.updatedBy = data.updatedBy;
    this.order = data.order;
  }
}
