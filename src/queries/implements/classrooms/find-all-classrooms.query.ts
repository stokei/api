import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllClassroomsDTO,
  OrderByDataFindAllClassroomsDTO,
  WhereDataFindAllClassroomsDTO
} from '@/dtos/classrooms/find-all-classrooms.dto';

export class FindAllClassroomsQuery implements IQuery, FindAllClassroomsDTO {
  where?: IWhere<WhereDataFindAllClassroomsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsDTO;

  constructor(data: FindAllClassroomsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
