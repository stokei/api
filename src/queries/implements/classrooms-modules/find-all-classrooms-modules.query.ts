import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomsModulesDTO,
  OrderByDataFindAllClassroomsModulesDTO,
  WhereDataFindAllClassroomsModulesDTO
} from '@/dtos/classrooms-modules/find-all-classrooms-modules.dto';

export class FindAllClassroomsModulesQuery
  implements IQuery, FindAllClassroomsModulesDTO
{
  where?: IWhere<WhereDataFindAllClassroomsModulesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsModulesDTO;

  constructor(data: FindAllClassroomsModulesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
