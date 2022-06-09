import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllPricesDTO,
  OrderByDataFindAllPricesDTO,
  WhereDataFindAllPricesDTO
} from '@/dtos/prices/find-all-prices.dto';

export class FindAllPricesQuery implements IQuery, FindAllPricesDTO {
  where?: IWhere<WhereDataFindAllPricesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPricesDTO;

  constructor(data: FindAllPricesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
