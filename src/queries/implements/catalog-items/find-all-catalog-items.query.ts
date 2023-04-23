import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCatalogItemsDTO,
  OrderByDataFindAllCatalogItemsDTO,
  WhereDataFindAllCatalogItemsDTO
} from '@/dtos/catalog-items/find-all-catalog-items.dto';

export class FindAllCatalogItemsQuery
  implements IQuery, FindAllCatalogItemsDTO
{
  where?: IWhere<WhereDataFindAllCatalogItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCatalogItemsDTO;

  constructor(data: FindAllCatalogItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
