import { OrderItemModel } from '@/models/order-item.model';

interface IDataOrderItemRemovedEvent {
  readonly removedBy: string;
  readonly orderItem: OrderItemModel;
}

export class OrderItemRemovedEvent {
  readonly removedBy: string;
  readonly orderItem: OrderItemModel;

  constructor(data: IDataOrderItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.orderItem = data.orderItem;
  }
}
