import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSortedItemsDTO } from '@/dtos/sorted-items/find-all-sorted-items.dto';
import { SortedItemModel } from '@/models/sorted-item.model';
import { FindAllSortedItemsQuery } from '@/queries/implements/sorted-items/find-all-sorted-items.query';

@Injectable()
export class FindAllSortedItemsService
  implements
    IBaseService<
      FindAllSortedItemsDTO,
      Promise<IPaginatedType<SortedItemModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSortedItemsDTO
  ): Promise<IPaginatedType<SortedItemModel>> {
    return await this.queryBus.execute(new FindAllSortedItemsQuery(data));
  }
}
