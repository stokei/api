import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllOrdersService } from '@/services/orders/find-all-orders';

@Injectable({ scope: Scope.REQUEST })
export class OrdersLoader {
  constructor(private readonly ordersService: FindAllOrdersService) {}

  readonly findByIds = new DataLoader(async (orderIds: string[]) => {
    const orders = await this.ordersService.execute({
      where: {
        AND: {
          ids: orderIds
        }
      }
    });
    const ordersMap = new Map(orders?.items?.map((order) => [order.id, order]));
    return orderIds.map((orderId) => ordersMap.get(orderId));
  });
}
