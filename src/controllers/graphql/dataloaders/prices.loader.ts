import { Injectable, Scope } from '@nestjs/common';
import { PaginationMapper } from '@stokei/nestjs';
import DataLoader from 'dataloader';

import { PriceModel } from '@/models/price.model';
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

  readonly findByParentIds = new DataLoader(
    async (priceParentIds: string[]) => {
      const prices = await this.pricesService.execute({
        where: {
          AND: {
            parent: {
              equals: priceParentIds
            }
          }
        }
      });
      return priceParentIds.map((parentId) => {
        const items = prices?.items?.filter(
          (price) => price.parent === parentId
        );
        return new PaginationMapper<PriceModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );
}
