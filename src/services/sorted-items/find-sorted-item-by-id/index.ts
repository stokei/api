import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SortedItemModel } from '@/models/sorted-item.model';
import { FindSortedItemByIdQuery } from '@/queries/implements/sorted-items/find-sorted-item-by-id.query';

@Injectable()
export class FindSortedItemByIdService
  implements IBaseService<string, Promise<SortedItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SortedItemModel> {
    return await this.queryBus.execute(new FindSortedItemByIdQuery(data));
  }
}
