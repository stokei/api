import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllSubscriptionContractItemsDTO,
  OrderByDataFindAllSubscriptionContractItemsDTO,
  WhereDataFindAllSubscriptionContractItemsDTO
} from '@/dtos/subscription-contract-items/find-all-subscription-contract-items.dto';

export class FindAllSubscriptionContractItemsQuery
  implements IQuery, FindAllSubscriptionContractItemsDTO
{
  where?: IWhere<WhereDataFindAllSubscriptionContractItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSubscriptionContractItemsDTO;

  constructor(data: FindAllSubscriptionContractItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
