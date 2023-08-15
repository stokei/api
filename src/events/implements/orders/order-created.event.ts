import { OrderModel } from '@/models/order.model';

interface IDataOrderCreatedEvent {
  readonly createdBy: string;
  readonly order: OrderModel;
}

export class OrderCreatedEvent {
  readonly createdBy: string;
  readonly order: OrderModel;

  constructor(data: IDataOrderCreatedEvent) {
    this.createdBy = data.createdBy;
    this.order = data.order;
  }
}
