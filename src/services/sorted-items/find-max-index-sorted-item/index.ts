import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindMaxIndexSortedItemDTO } from '@/dtos/sorted-items/find-max-index-sorted-item.dto';
import { SortedItemModel } from '@/models/sorted-item.model';
import { FindMaxIndexSortedItemQuery } from '@/queries/implements/sorted-items/find-max-index-sorted-item.query';

@Injectable()
export class FindMaxIndexSortedItemService
  implements IBaseService<FindMaxIndexSortedItemDTO, Promise<SortedItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindMaxIndexSortedItemDTO): Promise<SortedItemModel> {
    return await this.queryBus.execute(new FindMaxIndexSortedItemQuery(data));
  }
}
