import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCatalogsDTO,
  OrderByDataFindAllCatalogsDTO,
  WhereDataFindAllCatalogsDTO
} from '@/dtos/catalogs/find-all-catalogs.dto';

export class FindAllCatalogsQuery implements IQuery, FindAllCatalogsDTO {
  where?: IWhere<WhereDataFindAllCatalogsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCatalogsDTO;

  constructor(data: FindAllCatalogsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
