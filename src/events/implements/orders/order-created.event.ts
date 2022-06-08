import { OrderModel } from '@/models/order.model';

interface IDataOrderCreatedEvent {
  readonly order: OrderModel;
}

export class OrderCreatedEvent {
  readonly order: OrderModel;

  constructor(data: IDataOrderCreatedEvent) {
    this.order = data.order;
  }
}
