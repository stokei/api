import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllAppsDTO,
  OrderByDataFindAllAppsDTO,
  WhereDataFindAllAppsDTO
} from '@/dtos/apps/find-all-apps.dto';

export class FindAllAppsQuery implements IQuery, FindAllAppsDTO {
  where?: IWhere<WhereDataFindAllAppsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllAppsDTO;

  constructor(data: FindAllAppsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
