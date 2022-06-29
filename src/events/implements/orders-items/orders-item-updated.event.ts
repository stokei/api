import { OrdersItemModel } from '@/models/orders-item.model';

interface IDataOrdersItemUpdatedEvent {
  readonly updatedBy: string;
  readonly ordersItem: OrdersItemModel;
}

export class OrdersItemUpdatedEvent {
  readonly updatedBy: string;
  readonly ordersItem: OrdersItemModel;

  constructor(data: IDataOrdersItemUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.ordersItem = data.ordersItem;
  }
}
