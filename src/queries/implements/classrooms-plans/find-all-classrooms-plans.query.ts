import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomsPlansDTO,
  OrderByDataFindAllClassroomsPlansDTO,
  WhereDataFindAllClassroomsPlansDTO
} from '@/dtos/classrooms-plans/find-all-classrooms-plans.dto';

export class FindAllClassroomsPlansQuery
  implements IQuery, FindAllClassroomsPlansDTO
{
  where?: IWhere<WhereDataFindAllClassroomsPlansDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsPlansDTO;

  constructor(data: FindAllClassroomsPlansDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
