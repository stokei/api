import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllProductsTagsDTO,
  WhereDataFindAllProductsTagsDTO,
  OrderByDataFindAllProductsTagsDTO
} from '@/dtos/products-tags/find-all-products-tags.dto';

export class FindAllProductsTagsQuery
  implements IQuery, FindAllProductsTagsDTO
{
  where?: IWhere<WhereDataFindAllProductsTagsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProductsTagsDTO;

  constructor(data: FindAllProductsTagsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
