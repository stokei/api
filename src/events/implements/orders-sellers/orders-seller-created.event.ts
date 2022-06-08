import { OrdersSellerModel } from '@/models/orders-seller.model';

interface IDataOrdersSellerCreatedEvent {
  readonly ordersSeller: OrdersSellerModel;
}

export class OrdersSellerCreatedEvent {
  readonly ordersSeller: OrdersSellerModel;

  constructor(data: IDataOrdersSellerCreatedEvent) {
    this.ordersSeller = data.ordersSeller;
  }
}
