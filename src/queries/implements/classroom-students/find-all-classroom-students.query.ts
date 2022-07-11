import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomStudentsDTO,
  OrderByDataFindAllClassroomStudentsDTO,
  WhereDataFindAllClassroomStudentsDTO
} from '@/dtos/classroom-students/find-all-classroom-students.dto';

export class FindAllClassroomStudentsQuery
  implements IQuery, FindAllClassroomStudentsDTO
{
  where?: IWhere<WhereDataFindAllClassroomStudentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomStudentsDTO;

  constructor(data: FindAllClassroomStudentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
