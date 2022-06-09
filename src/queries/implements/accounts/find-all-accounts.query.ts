import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllAccountsDTO,
  OrderByDataFindAllAccountsDTO,
  WhereDataFindAllAccountsDTO
} from '@/dtos/accounts/find-all-accounts.dto';

export class FindAllAccountsQuery implements IQuery, FindAllAccountsDTO {
  where?: IWhere<WhereDataFindAllAccountsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllAccountsDTO;

  constructor(data: FindAllAccountsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
