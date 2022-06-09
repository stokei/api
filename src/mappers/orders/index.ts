import { convertToISODateString } from '@stokei/nestjs';

import { OrderEntity } from '@/entities';
import { OrderModel } from '@/models/order.model';

export class OrderMapper {
  toModel(order: OrderEntity) {
    return (
      order &&
      new OrderModel({
        ...order,
        updatedAt: convertToISODateString(order.updatedAt),
        createdAt: convertToISODateString(order.createdAt)
      })
    );
  }
  toModels(orders: OrderEntity[]) {
    return orders?.length > 0 ? orders.map(this.toModel).filter(Boolean) : [];
  }
}
