import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCartsItemsService } from '@/services/carts-items/find-all-carts-items';

@Injectable({ scope: Scope.REQUEST })
export class CartsItemsLoader {
  constructor(private readonly cartsItemsService: FindAllCartsItemsService) {}

  readonly findByIds = new DataLoader(async (cartsItemIds: string[]) => {
    const cartsItems = await this.cartsItemsService.execute({
      where: {
        AND: {
          ids: cartsItemIds
        }
      }
    });
    const cartsItemsMap = new Map(
      cartsItems?.items?.map((cartsItem) => [cartsItem.id, cartsItem])
    );
    return cartsItemIds.map((cartsItemId) => cartsItemsMap.get(cartsItemId));
  });
}
