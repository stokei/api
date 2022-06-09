import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomsInstructorsDTO,
  OrderByDataFindAllClassroomsInstructorsDTO,
  WhereDataFindAllClassroomsInstructorsDTO
} from '@/dtos/classrooms-instructors/find-all-classrooms-instructors.dto';

export class FindAllClassroomsInstructorsQuery
  implements IQuery, FindAllClassroomsInstructorsDTO
{
  where?: IWhere<WhereDataFindAllClassroomsInstructorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsInstructorsDTO;

  constructor(data: FindAllClassroomsInstructorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
