import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllProjectsPlansDTO,
  OrderByDataFindAllProjectsPlansDTO,
  WhereDataFindAllProjectsPlansDTO
} from '@/dtos/projects-plans/find-all-projects-plans.dto';

export class FindAllProjectsPlansQuery
  implements IQuery, FindAllProjectsPlansDTO
{
  where?: IWhere<WhereDataFindAllProjectsPlansDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProjectsPlansDTO;

  constructor(data: FindAllProjectsPlansDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
