import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomsStudentsDTO,
  OrderByDataFindAllClassroomsStudentsDTO,
  WhereDataFindAllClassroomsStudentsDTO
} from '@/dtos/classrooms-students/find-all-classrooms-students.dto';

export class FindAllClassroomsStudentsQuery
  implements IQuery, FindAllClassroomsStudentsDTO
{
  where?: IWhere<WhereDataFindAllClassroomsStudentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsStudentsDTO;

  constructor(data: FindAllClassroomsStudentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
