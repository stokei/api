import { OrdersItemModel } from '@/models/orders-item.model';

interface IDataOrdersItemCreatedEvent {
  readonly createdBy: string;
  readonly ordersItem: OrdersItemModel;
}

export class OrdersItemCreatedEvent {
  readonly createdBy: string;
  readonly ordersItem: OrdersItemModel;

  constructor(data: IDataOrdersItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.ordersItem = data.ordersItem;
  }
}
