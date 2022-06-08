import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllCheckoutsCurrenciesDTO,
  WhereDataFindAllCheckoutsCurrenciesDTO,
  OrderByDataFindAllCheckoutsCurrenciesDTO
} from '@/dtos/checkouts-currencies/find-all-checkouts-currencies.dto';

export class FindAllCheckoutsCurrenciesQuery
  implements IQuery, FindAllCheckoutsCurrenciesDTO
{
  where?: IWhere<WhereDataFindAllCheckoutsCurrenciesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCheckoutsCurrenciesDTO;

  constructor(data: FindAllCheckoutsCurrenciesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
