import { OrderModel } from '@/models/order.model';

interface IDataOrderUpdatedEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;
}

export class OrderUpdatedEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;

  constructor(data: IDataOrderUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.order = data.order;
  }
}
