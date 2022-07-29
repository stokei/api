import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllSubscriptionContractsDTO,
  OrderByDataFindAllSubscriptionContractsDTO,
  WhereDataFindAllSubscriptionContractsDTO
} from '@/dtos/subscription-contracts/find-all-subscription-contracts.dto';

export class FindAllSubscriptionContractsQuery
  implements IQuery, FindAllSubscriptionContractsDTO
{
  where?: IWhere<WhereDataFindAllSubscriptionContractsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSubscriptionContractsDTO;

  constructor(data: FindAllSubscriptionContractsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
