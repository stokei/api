import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomsEnrollmentsDTO,
  OrderByDataFindAllClassroomsEnrollmentsDTO,
  WhereDataFindAllClassroomsEnrollmentsDTO
} from '@/dtos/classrooms-enrollments/find-all-classrooms-enrollments.dto';

export class FindAllClassroomsEnrollmentsQuery
  implements IQuery, FindAllClassroomsEnrollmentsDTO
{
  where?: IWhere<WhereDataFindAllClassroomsEnrollmentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsEnrollmentsDTO;

  constructor(data: FindAllClassroomsEnrollmentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
