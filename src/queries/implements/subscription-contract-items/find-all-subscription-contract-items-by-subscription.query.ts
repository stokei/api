import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO } from '@stokei/nestjs';

import {
  FindAllSubscriptionContractItemsBySubscriptionDTO,
  OrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO,
  WhereDataFindAllSubscriptionContractItemsBySubscriptionDTO
} from '@/dtos/subscription-contract-items/find-all-subscription-contract-items-by-subscription.dto';

export class FindAllSubscriptionContractItemsBySubscriptionQuery
  implements IQuery, FindAllSubscriptionContractItemsBySubscriptionDTO
{
  where?: WhereDataFindAllSubscriptionContractItemsBySubscriptionDTO;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO;

  constructor(data: FindAllSubscriptionContractItemsBySubscriptionDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
