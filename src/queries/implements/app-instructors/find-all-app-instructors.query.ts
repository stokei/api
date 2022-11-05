import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllAppInstructorsDTO,
  OrderByDataFindAllAppInstructorsDTO,
  WhereDataFindAllAppInstructorsDTO
} from '@/dtos/app-instructors/find-all-app-instructors.dto';

export class FindAllAppInstructorsQuery
  implements IQuery, FindAllAppInstructorsDTO
{
  where?: IWhere<WhereDataFindAllAppInstructorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllAppInstructorsDTO;

  constructor(data: FindAllAppInstructorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
