import { OrderModel } from '@/models/order.model';

interface IDataOrderRemovedEvent {
  readonly removedBy: string;
  readonly order: OrderModel;
}

export class OrderRemovedEvent {
  readonly removedBy: string;
  readonly order: OrderModel;

  constructor(data: IDataOrderRemovedEvent) {
    this.removedBy = data.removedBy;
    this.order = data.order;
  }
}
