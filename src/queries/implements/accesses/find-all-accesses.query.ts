import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllAccessesDTO,
  OrderByDataFindAllAccessesDTO,
  WhereDataFindAllAccessesDTO
} from '@/dtos/accesses/find-all-accesses.dto';

export class FindAllAccessesQuery implements IQuery, FindAllAccessesDTO {
  where?: IWhere<WhereDataFindAllAccessesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllAccessesDTO;

  constructor(data: FindAllAccessesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
