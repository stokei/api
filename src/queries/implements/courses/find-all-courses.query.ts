import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCoursesDTO,
  OrderByDataFindAllCoursesDTO,
  WhereDataFindAllCoursesDTO
} from '@/dtos/courses/find-all-courses.dto';

export class FindAllCoursesQuery implements IQuery, FindAllCoursesDTO {
  where?: IWhere<WhereDataFindAllCoursesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCoursesDTO;

  constructor(data: FindAllCoursesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
