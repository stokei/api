import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO } from '@stokei/nestjs';

import {
  FindAllSubscriptionContractsByItemDTO,
  OrderByDataFindAllSubscriptionContractsByItemDTO,
  WhereDataFindAllSubscriptionContractsByItemDTO
} from '@/dtos/subscription-contracts/find-all-subscription-contracts-by-item.dto';

export class FindAllSubscriptionContractsByItemQuery
  implements IQuery, FindAllSubscriptionContractsByItemDTO
{
  where?: WhereDataFindAllSubscriptionContractsByItemDTO;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSubscriptionContractsByItemDTO;

  constructor(data: FindAllSubscriptionContractsByItemDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
