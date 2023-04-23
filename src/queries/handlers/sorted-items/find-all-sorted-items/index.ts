import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SortedItemMapper } from '@/mappers/sorted-items';
import { SortedItemModel } from '@/models/sorted-item.model';
import { FindAllSortedItemsQuery } from '@/queries/implements/sorted-items/find-all-sorted-items.query';
import { CountSortedItemsRepository } from '@/repositories/sorted-items/count-sorted-items';
import { FindAllSortedItemsRepository } from '@/repositories/sorted-items/find-all-sorted-items';

@QueryHandler(FindAllSortedItemsQuery)
export class FindAllSortedItemsQueryHandler
  implements IQueryHandler<FindAllSortedItemsQuery>
{
  constructor(
    private readonly findAllSortedItemRepository: FindAllSortedItemsRepository,
    private readonly countSortedItemsRepository: CountSortedItemsRepository
  ) {}

  async execute(
    query: FindAllSortedItemsQuery
  ): Promise<IPaginatedType<SortedItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new SortedItemMapper().toFindAllQueryClean(query);
    const sortedItems = await this.findAllSortedItemRepository.execute(data);
    const totalCount = await this.countSortedItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<SortedItemModel>().toPaginationList({
      items: sortedItems,
      page: data.page,
      totalCount
    });
  }
}
