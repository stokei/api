import { OrdersAddressModel } from '@/models/orders-address.model';

interface IDataOrdersAddressUpdatedEvent {
  readonly ordersAddress: OrdersAddressModel;
}

export class OrdersAddressUpdatedEvent {
  readonly ordersAddress: OrdersAddressModel;

  constructor(data: IDataOrdersAddressUpdatedEvent) {
    this.ordersAddress = data.ordersAddress;
  }
}
