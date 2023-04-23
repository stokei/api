import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, SortedItemNotFoundException } from '@/errors';
import { SortedItemModel } from '@/models/sorted-item.model';
import { FindMaxIndexSortedItemQuery } from '@/queries/implements/sorted-items/find-max-index-sorted-item.query';
import { FindMaxIndexSortedItemRepository } from '@/repositories/sorted-items/find-max-index-sorted-item';

@QueryHandler(FindMaxIndexSortedItemQuery)
export class FindMaxIndexSortedItemQueryHandler
  implements IQueryHandler<FindMaxIndexSortedItemQuery>
{
  constructor(
    private readonly findMaxIndexSortedItemRepository: FindMaxIndexSortedItemRepository
  ) {}

  async execute(query: FindMaxIndexSortedItemQuery): Promise<SortedItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);

    const sortedItem = await this.findMaxIndexSortedItemRepository.execute({
      where: data.where
    });
    if (!sortedItem) {
      throw new SortedItemNotFoundException();
    }
    return sortedItem;
  }

  private clearData(
    query: FindMaxIndexSortedItemQuery
  ): FindMaxIndexSortedItemQuery {
    return cleanObject({
      where: {
        parent: cleanValue(query?.where?.parent),
        app: cleanValue(query?.where?.app)
      }
    });
  }
}
