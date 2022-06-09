import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllProductsDTO,
  OrderByDataFindAllProductsDTO,
  WhereDataFindAllProductsDTO
} from '@/dtos/products/find-all-products.dto';

export class FindAllProductsQuery implements IQuery, FindAllProductsDTO {
  where?: IWhere<WhereDataFindAllProductsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProductsDTO;

  constructor(data: FindAllProductsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
