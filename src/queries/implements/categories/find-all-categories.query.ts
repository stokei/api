import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCategoriesDTO,
  OrderByDataFindAllCategoriesDTO,
  WhereDataFindAllCategoriesDTO
} from '@/dtos/categories/find-all-categories.dto';

export class FindAllCategoriesQuery implements IQuery, FindAllCategoriesDTO {
  where?: IWhere<WhereDataFindAllCategoriesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCategoriesDTO;

  constructor(data: FindAllCategoriesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
