import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCartItemsDTO,
  OrderByDataFindAllCartItemsDTO,
  WhereDataFindAllCartItemsDTO
} from '@/dtos/cart-items/find-all-cart-items.dto';

export class FindAllCartItemsQuery implements IQuery, FindAllCartItemsDTO {
  where?: IWhere<WhereDataFindAllCartItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCartItemsDTO;

  constructor(data: FindAllCartItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
