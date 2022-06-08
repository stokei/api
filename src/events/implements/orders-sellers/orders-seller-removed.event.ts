import { OrdersSellerModel } from '@/models/orders-seller.model';

interface IDataOrdersSellerRemovedEvent {
  readonly ordersSeller: OrdersSellerModel;
}

export class OrdersSellerRemovedEvent {
  readonly ordersSeller: OrdersSellerModel;

  constructor(data: IDataOrdersSellerRemovedEvent) {
    this.ordersSeller = data.ordersSeller;
  }
}
