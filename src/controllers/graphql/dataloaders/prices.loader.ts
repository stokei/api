import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllPricesService } from '@/services/prices/find-all-prices';

@Injectable({ scope: Scope.REQUEST })
export class PricesLoader {
  constructor(private readonly pricesService: FindAllPricesService) {}

  readonly findByIds = new DataLoader(async (priceIds: string[]) => {
    const prices = await this.pricesService.execute({
      where: {
        AND: {
          ids: priceIds
        }
      }
    });
    const pricesMap = new Map(prices?.items?.map((price) => [price.id, price]));
    return priceIds.map((priceId) => pricesMap.get(priceId));
  });
}
