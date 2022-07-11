import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCourseStudentsDTO,
  OrderByDataFindAllCourseStudentsDTO,
  WhereDataFindAllCourseStudentsDTO
} from '@/dtos/course-students/find-all-course-students.dto';

export class FindAllCourseStudentsQuery
  implements IQuery, FindAllCourseStudentsDTO
{
  where?: IWhere<WhereDataFindAllCourseStudentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCourseStudentsDTO;

  constructor(data: FindAllCourseStudentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
