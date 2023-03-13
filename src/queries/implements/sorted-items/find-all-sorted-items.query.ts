import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllSortedItemsDTO,
  OrderByDataFindAllSortedItemsDTO,
  WhereDataFindAllSortedItemsDTO
} from '@/dtos/sorted-items/find-all-sorted-items.dto';

export class FindAllSortedItemsQuery implements IQuery, FindAllSortedItemsDTO {
  where?: IWhere<WhereDataFindAllSortedItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSortedItemsDTO;

  constructor(data: FindAllSortedItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
