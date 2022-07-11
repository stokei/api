import { OrderItemModel } from '@/models/order-item.model';

interface IDataOrderItemCreatedEvent {
  readonly createdBy: string;
  readonly orderItem: OrderItemModel;
}

export class OrderItemCreatedEvent {
  readonly createdBy: string;
  readonly orderItem: OrderItemModel;

  constructor(data: IDataOrderItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.orderItem = data.orderItem;
  }
}
