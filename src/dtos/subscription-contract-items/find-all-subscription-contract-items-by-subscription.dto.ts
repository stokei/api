import {
  IOrderBy,
  IPaginatinInputDTO,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

export interface WhereDataFindAllSubscriptionContractItemsBySubscriptionDTO {
  app?: IWhereData;
  parent?: IWhereDataSearch;
  status?: SubscriptionContractStatus;
  product?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllSubscriptionContractItemsBySubscriptionDTO =
  keyof WhereDataFindAllSubscriptionContractItemsBySubscriptionDTO;

export interface OrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}

export type IKeysOrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO =
  keyof OrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO;

export interface FindAllSubscriptionContractItemsBySubscriptionDTO {
  where?: WhereDataFindAllSubscriptionContractItemsBySubscriptionDTO;
  orderBy?: OrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO;
  page?: IPaginatinInputDTO;
}
