import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllHerosDTO,
  OrderByDataFindAllHerosDTO,
  WhereDataFindAllHerosDTO
} from '@/dtos/heros/find-all-heros.dto';

export class FindAllHerosQuery implements IQuery, FindAllHerosDTO {
  where?: IWhere<WhereDataFindAllHerosDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllHerosDTO;

  constructor(data: FindAllHerosDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
