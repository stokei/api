import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllProductComboItemsDTO,
  OrderByDataFindAllProductComboItemsDTO,
  WhereDataFindAllProductComboItemsDTO
} from '@/dtos/product-combo-items/find-all-product-combo-items.dto';

export class FindAllProductComboItemsQuery
  implements IQuery, FindAllProductComboItemsDTO
{
  where?: IWhere<WhereDataFindAllProductComboItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProductComboItemsDTO;

  constructor(data: FindAllProductComboItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
