import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllOrdersItemsService } from '@/services/orders-items/find-all-orders-items';

@Injectable({ scope: Scope.REQUEST })
export class OrdersItemsLoader {
  constructor(private readonly ordersItemsService: FindAllOrdersItemsService) {}

  readonly findByIds = new DataLoader(async (ordersItemIds: string[]) => {
    const ordersItems = await this.ordersItemsService.execute({
      where: {
        AND: {
          ids: ordersItemIds
        }
      }
    });
    const ordersItemsMap = new Map(
      ordersItems?.items?.map((ordersItem) => [ordersItem.id, ordersItem])
    );
    return ordersItemIds.map((ordersItemId) =>
      ordersItemsMap.get(ordersItemId)
    );
  });
}
