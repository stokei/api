import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllSortedItemsService } from '@/services/sorted-items/find-all-sorted-items';

@Injectable({ scope: Scope.REQUEST })
export class SortedItemsLoader {
  constructor(private readonly sortedItemsService: FindAllSortedItemsService) {}

  readonly findByIds = new DataLoader(async (sortedItemIds: string[]) => {
    const sortedItems = await this.sortedItemsService.execute({
      where: {
        AND: {
          ids: sortedItemIds
        }
      }
    });
    const sortedItemsMap = new Map(
      sortedItems?.items?.map((sortedItem) => [sortedItem.id, sortedItem])
    );
    return sortedItemIds.map((sortedItemId) =>
      sortedItemsMap.get(sortedItemId)
    );
  });
}
