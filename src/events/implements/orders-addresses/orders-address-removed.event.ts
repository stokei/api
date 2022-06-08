import { OrdersAddressModel } from '@/models/orders-address.model';

interface IDataOrdersAddressRemovedEvent {
  readonly ordersAddress: OrdersAddressModel;
}

export class OrdersAddressRemovedEvent {
  readonly ordersAddress: OrdersAddressModel;

  constructor(data: IDataOrdersAddressRemovedEvent) {
    this.ordersAddress = data.ordersAddress;
  }
}
