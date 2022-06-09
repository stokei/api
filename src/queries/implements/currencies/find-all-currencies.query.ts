import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCurrenciesDTO,
  OrderByDataFindAllCurrenciesDTO,
  WhereDataFindAllCurrenciesDTO
} from '@/dtos/currencies/find-all-currencies.dto';

export class FindAllCurrenciesQuery implements IQuery, FindAllCurrenciesDTO {
  where?: IWhere<WhereDataFindAllCurrenciesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCurrenciesDTO;

  constructor(data: FindAllCurrenciesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
