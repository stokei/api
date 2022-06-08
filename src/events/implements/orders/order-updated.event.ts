import { OrderModel } from '@/models/order.model';

interface IDataOrderUpdatedEvent {
  readonly order: OrderModel;
}

export class OrderUpdatedEvent {
  readonly order: OrderModel;

  constructor(data: IDataOrderUpdatedEvent) {
    this.order = data.order;
  }
}
