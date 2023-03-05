import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllRolesDTO,
  OrderByDataFindAllRolesDTO,
  WhereDataFindAllRolesDTO
} from '@/dtos/roles/find-all-roles.dto';

export class FindAllRolesQuery implements IQuery, FindAllRolesDTO {
  where?: IWhere<WhereDataFindAllRolesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllRolesDTO;

  constructor(data: FindAllRolesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
