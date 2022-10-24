import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllPriceTiersDTO,
  OrderByDataFindAllPriceTiersDTO,
  WhereDataFindAllPriceTiersDTO
} from '@/dtos/price-tiers/find-all-price-tiers.dto';

export class FindAllPriceTiersQuery implements IQuery, FindAllPriceTiersDTO {
  where?: IWhere<WhereDataFindAllPriceTiersDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPriceTiersDTO;

  constructor(data: FindAllPriceTiersDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
