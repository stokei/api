import { OrdersItemModel } from '@/models/orders-item.model';

interface IDataOrdersItemCreatedEvent {
  readonly ordersItem: OrdersItemModel;
}

export class OrdersItemCreatedEvent {
  readonly ordersItem: OrdersItemModel;

  constructor(data: IDataOrdersItemCreatedEvent) {
    this.ordersItem = data.ordersItem;
  }
}
