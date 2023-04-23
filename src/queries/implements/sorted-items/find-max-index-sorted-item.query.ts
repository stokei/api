import { IQuery } from '@nestjs/cqrs';

import {
  FindMaxIndexSortedItemDTO,
  FindMaxIndexSortedItemWhereDTO
} from '@/dtos/sorted-items/find-max-index-sorted-item.dto';

export class FindMaxIndexSortedItemQuery
  implements IQuery, FindMaxIndexSortedItemDTO
{
  where: FindMaxIndexSortedItemWhereDTO;

  constructor(data: FindMaxIndexSortedItemDTO) {
    this.where = data.where;
  }
}
