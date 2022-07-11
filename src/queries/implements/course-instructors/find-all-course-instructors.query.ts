import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCourseInstructorsDTO,
  OrderByDataFindAllCourseInstructorsDTO,
  WhereDataFindAllCourseInstructorsDTO
} from '@/dtos/course-instructors/find-all-course-instructors.dto';

export class FindAllCourseInstructorsQuery
  implements IQuery, FindAllCourseInstructorsDTO
{
  where?: IWhere<WhereDataFindAllCourseInstructorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCourseInstructorsDTO;

  constructor(data: FindAllCourseInstructorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
