import { OrdersItemModel } from '@/models/orders-item.model';

interface IDataOrdersItemRemovedEvent {
  readonly ordersItem: OrdersItemModel;
}

export class OrdersItemRemovedEvent {
  readonly ordersItem: OrdersItemModel;

  constructor(data: IDataOrdersItemRemovedEvent) {
    this.ordersItem = data.ordersItem;
  }
}
