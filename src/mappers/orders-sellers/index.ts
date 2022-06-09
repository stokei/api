import { convertToISODateString } from '@stokei/nestjs';

import { OrdersSellerEntity } from '@/entities';
import { OrdersSellerModel } from '@/models/orders-seller.model';

export class OrdersSellerMapper {
  toModel(ordersSeller: OrdersSellerEntity) {
    return (
      ordersSeller &&
      new OrdersSellerModel({
        ...ordersSeller,
        updatedAt: convertToISODateString(ordersSeller.updatedAt),
        createdAt: convertToISODateString(ordersSeller.createdAt)
      })
    );
  }
  toModels(ordersSellers: OrdersSellerEntity[]) {
    return ordersSellers?.length > 0
      ? ordersSellers.map(this.toModel).filter(Boolean)
      : [];
  }
}
