import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllSubscriptionsDTO,
  OrderByDataFindAllSubscriptionsDTO,
  WhereDataFindAllSubscriptionsDTO
} from '@/dtos/subscriptions/find-all-subscriptions.dto';

export class FindAllSubscriptionsQuery
  implements IQuery, FindAllSubscriptionsDTO
{
  where?: IWhere<WhereDataFindAllSubscriptionsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSubscriptionsDTO;

  constructor(data: FindAllSubscriptionsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
