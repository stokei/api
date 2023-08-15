import { OrderItemModel } from '@/models/order-item.model';

interface IDataOrderItemUpdatedEvent {
  readonly updatedBy: string;
  readonly orderItem: OrderItemModel;
}

export class OrderItemUpdatedEvent {
  readonly updatedBy: string;
  readonly orderItem: OrderItemModel;

  constructor(data: IDataOrderItemUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.orderItem = data.orderItem;
  }
}
