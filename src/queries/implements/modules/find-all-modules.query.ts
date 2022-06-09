import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllModulesDTO,
  OrderByDataFindAllModulesDTO,
  WhereDataFindAllModulesDTO
} from '@/dtos/modules/find-all-modules.dto';

export class FindAllModulesQuery implements IQuery, FindAllModulesDTO {
  where?: IWhere<WhereDataFindAllModulesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllModulesDTO;

  constructor(data: FindAllModulesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
