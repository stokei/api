import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllPhonesDTO,
  OrderByDataFindAllPhonesDTO,
  WhereDataFindAllPhonesDTO
} from '@/dtos/phones/find-all-phones.dto';

export class FindAllPhonesQuery implements IQuery, FindAllPhonesDTO {
  where?: IWhere<WhereDataFindAllPhonesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPhonesDTO;

  constructor(data: FindAllPhonesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
