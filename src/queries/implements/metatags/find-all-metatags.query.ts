import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllMetatagsDTO,
  OrderByDataFindAllMetatagsDTO,
  WhereDataFindAllMetatagsDTO
} from '@/dtos/metatags/find-all-metatags.dto';

export class FindAllMetatagsQuery implements IQuery, FindAllMetatagsDTO {
  where?: IWhere<WhereDataFindAllMetatagsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllMetatagsDTO;

  constructor(data: FindAllMetatagsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
