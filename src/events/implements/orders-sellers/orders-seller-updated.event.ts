import { OrdersSellerModel } from '@/models/orders-seller.model';

interface IDataOrdersSellerUpdatedEvent {
  readonly ordersSeller: OrdersSellerModel;
}

export class OrdersSellerUpdatedEvent {
  readonly ordersSeller: OrdersSellerModel;

  constructor(data: IDataOrdersSellerUpdatedEvent) {
    this.ordersSeller = data.ordersSeller;
  }
}
