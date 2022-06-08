import { OrdersAddressModel } from '@/models/orders-address.model';

interface IDataOrdersAddressCreatedEvent {
  readonly ordersAddress: OrdersAddressModel;
}

export class OrdersAddressCreatedEvent {
  readonly ordersAddress: OrdersAddressModel;

  constructor(data: IDataOrdersAddressCreatedEvent) {
    this.ordersAddress = data.ordersAddress;
  }
}
