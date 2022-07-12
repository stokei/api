import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomModulesDTO,
  OrderByDataFindAllClassroomModulesDTO,
  WhereDataFindAllClassroomModulesDTO
} from '@/dtos/classroom-modules/find-all-classroom-modules.dto';

export class FindAllClassroomModulesQuery
  implements IQuery, FindAllClassroomModulesDTO
{
  where?: IWhere<WhereDataFindAllClassroomModulesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomModulesDTO;

  constructor(data: FindAllClassroomModulesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
