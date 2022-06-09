import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCoursesAdminsDTO,
  OrderByDataFindAllCoursesAdminsDTO,
  WhereDataFindAllCoursesAdminsDTO
} from '@/dtos/courses-admins/find-all-courses-admins.dto';

export class FindAllCoursesAdminsQuery
  implements IQuery, FindAllCoursesAdminsDTO
{
  where?: IWhere<WhereDataFindAllCoursesAdminsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCoursesAdminsDTO;

  constructor(data: FindAllCoursesAdminsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
