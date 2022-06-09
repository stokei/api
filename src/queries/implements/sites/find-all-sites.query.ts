import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllSitesDTO,
  OrderByDataFindAllSitesDTO,
  WhereDataFindAllSitesDTO
} from '@/dtos/sites/find-all-sites.dto';

export class FindAllSitesQuery implements IQuery, FindAllSitesDTO {
  where?: IWhere<WhereDataFindAllSitesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSitesDTO;

  constructor(data: FindAllSitesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
