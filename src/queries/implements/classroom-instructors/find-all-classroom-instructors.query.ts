import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomInstructorsDTO,
  OrderByDataFindAllClassroomInstructorsDTO,
  WhereDataFindAllClassroomInstructorsDTO
} from '@/dtos/classroom-instructors/find-all-classroom-instructors.dto';

export class FindAllClassroomInstructorsQuery
  implements IQuery, FindAllClassroomInstructorsDTO
{
  where?: IWhere<WhereDataFindAllClassroomInstructorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomInstructorsDTO;

  constructor(data: FindAllClassroomInstructorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
