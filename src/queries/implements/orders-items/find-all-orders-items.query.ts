import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllOrdersItemsDTO,
  OrderByDataFindAllOrdersItemsDTO,
  WhereDataFindAllOrdersItemsDTO
} from '@/dtos/orders-items/find-all-orders-items.dto';

export class FindAllOrdersItemsQuery implements IQuery, FindAllOrdersItemsDTO {
  where?: IWhere<WhereDataFindAllOrdersItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllOrdersItemsDTO;

  constructor(data: FindAllOrdersItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
