import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';

@Injectable({ scope: Scope.REQUEST })
export class OrderItemsLoader {
  constructor(private readonly orderItemsService: FindAllOrderItemsService) {}

  readonly findByIds = new DataLoader(async (orderItemIds: string[]) => {
    const orderItems = await this.orderItemsService.execute({
      where: {
        AND: {
          ids: orderItemIds
        }
      }
    });
    const orderItemsMap = new Map(
      orderItems?.items?.map((orderItem) => [orderItem.id, orderItem])
    );
    return orderItemIds.map((orderItemId) => orderItemsMap.get(orderItemId));
  });
}
