import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllOrdersSellersService } from '@/services/orders-sellers/find-all-orders-sellers';

@Injectable({ scope: Scope.REQUEST })
export class OrdersSellersLoader {
  constructor(
    private readonly ordersSellersService: FindAllOrdersSellersService
  ) {}

  readonly findByIds = new DataLoader(async (ordersSellerIds: string[]) => {
    const ordersSellers = await this.ordersSellersService.execute({
      where: {
        AND: {
          ids: ordersSellerIds
        }
      }
    });
    const ordersSellersMap = new Map(
      ordersSellers?.items?.map((ordersSeller) => [
        ordersSeller.id,
        ordersSeller
      ])
    );
    return ordersSellerIds.map((ordersSellerId) =>
      ordersSellersMap.get(ordersSellerId)
    );
  });
}
