import { OrdersItemModel } from '@/models/orders-item.model';

interface IDataOrdersItemRemovedEvent {
  readonly removedBy: string;
  readonly ordersItem: OrdersItemModel;
}

export class OrdersItemRemovedEvent {
  readonly removedBy: string;
  readonly ordersItem: OrdersItemModel;

  constructor(data: IDataOrdersItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.ordersItem = data.ordersItem;
  }
}
