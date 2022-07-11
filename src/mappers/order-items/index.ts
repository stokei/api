import { convertToISODateString } from '@stokei/nestjs';

import { OrderItemEntity } from '@/entities';
import { OrderItemModel } from '@/models/order-item.model';

export class OrderItemMapper {
  toModel(orderItem: OrderItemEntity) {
    return (
      orderItem &&
      new OrderItemModel({
        ...orderItem,
        updatedAt: convertToISODateString(orderItem.updatedAt),
        createdAt: convertToISODateString(orderItem.createdAt)
      })
    );
  }
  toModels(orderItems: OrderItemEntity[]) {
    return orderItems?.length > 0
      ? orderItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
