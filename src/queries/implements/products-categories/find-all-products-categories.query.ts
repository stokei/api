import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllProductsCategoriesDTO,
  OrderByDataFindAllProductsCategoriesDTO,
  WhereDataFindAllProductsCategoriesDTO
} from '@/dtos/products-categories/find-all-products-categories.dto';

export class FindAllProductsCategoriesQuery
  implements IQuery, FindAllProductsCategoriesDTO
{
  where?: IWhere<WhereDataFindAllProductsCategoriesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProductsCategoriesDTO;

  constructor(data: FindAllProductsCategoriesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
