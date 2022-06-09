import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomsAdminsDTO,
  OrderByDataFindAllClassroomsAdminsDTO,
  WhereDataFindAllClassroomsAdminsDTO
} from '@/dtos/classrooms-admins/find-all-classrooms-admins.dto';

export class FindAllClassroomsAdminsQuery
  implements IQuery, FindAllClassroomsAdminsDTO
{
  where?: IWhere<WhereDataFindAllClassroomsAdminsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsAdminsDTO;

  constructor(data: FindAllClassroomsAdminsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
