import { convertToISODateString } from '@stokei/nestjs';

import { OrdersItemEntity } from '@/entities';
import { OrdersItemModel } from '@/models/orders-item.model';

export class OrdersItemMapper {
  toModel(ordersItem: OrdersItemEntity) {
    return (
      ordersItem &&
      new OrdersItemModel({
        ...ordersItem,
        updatedAt: convertToISODateString(ordersItem.updatedAt),
        createdAt: convertToISODateString(ordersItem.createdAt)
      })
    );
  }
  toModels(ordersItems: OrdersItemEntity[]) {
    return ordersItems?.length > 0
      ? ordersItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
