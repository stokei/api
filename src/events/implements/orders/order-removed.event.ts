import { OrderModel } from '@/models/order.model';

interface IDataOrderRemovedEvent {
  readonly order: OrderModel;
}

export class OrderRemovedEvent {
  readonly order: OrderModel;

  constructor(data: IDataOrderRemovedEvent) {
    this.order = data.order;
  }
}
