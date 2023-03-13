import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SortedItemNotFoundException
} from '@/errors';
import { SortedItemModel } from '@/models/sorted-item.model';
import { FindSortedItemByIdQuery } from '@/queries/implements/sorted-items/find-sorted-item-by-id.query';
import { FindSortedItemByIdRepository } from '@/repositories/sorted-items/find-sorted-item-by-id';

@QueryHandler(FindSortedItemByIdQuery)
export class FindSortedItemByIdQueryHandler
  implements IQueryHandler<FindSortedItemByIdQuery>
{
  constructor(
    private readonly findSortedItemByIdRepository: FindSortedItemByIdRepository
  ) {}

  async execute(query: FindSortedItemByIdQuery): Promise<SortedItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const sortedItem = await this.findSortedItemByIdRepository.execute(id);
    if (!sortedItem) {
      throw new SortedItemNotFoundException();
    }
    return sortedItem;
  }
}
