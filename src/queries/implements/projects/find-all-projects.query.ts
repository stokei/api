import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllProjectsDTO,
  OrderByDataFindAllProjectsDTO,
  WhereDataFindAllProjectsDTO
} from '@/dtos/projects/find-all-projects.dto';

export class FindAllProjectsQuery implements IQuery, FindAllProjectsDTO {
  where?: IWhere<WhereDataFindAllProjectsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProjectsDTO;

  constructor(data: FindAllProjectsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
