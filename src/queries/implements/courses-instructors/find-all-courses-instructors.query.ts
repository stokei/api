import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCoursesInstructorsDTO,
  OrderByDataFindAllCoursesInstructorsDTO,
  WhereDataFindAllCoursesInstructorsDTO
} from '@/dtos/courses-instructors/find-all-courses-instructors.dto';

export class FindAllCoursesInstructorsQuery
  implements IQuery, FindAllCoursesInstructorsDTO
{
  where?: IWhere<WhereDataFindAllCoursesInstructorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCoursesInstructorsDTO;

  constructor(data: FindAllCoursesInstructorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
