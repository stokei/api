import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllOrderItemsDTO,
  OrderByDataFindAllOrderItemsDTO,
  WhereDataFindAllOrderItemsDTO
} from '@/dtos/order-items/find-all-order-items.dto';

export class FindAllOrderItemsQuery implements IQuery, FindAllOrderItemsDTO {
  where?: IWhere<WhereDataFindAllOrderItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllOrderItemsDTO;

  constructor(data: FindAllOrderItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
