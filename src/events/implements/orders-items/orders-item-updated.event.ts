import { OrdersItemModel } from '@/models/orders-item.model';

interface IDataOrdersItemUpdatedEvent {
  readonly ordersItem: OrdersItemModel;
}

export class OrdersItemUpdatedEvent {
  readonly ordersItem: OrdersItemModel;

  constructor(data: IDataOrdersItemUpdatedEvent) {
    this.ordersItem = data.ordersItem;
  }
}
