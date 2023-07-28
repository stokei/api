import {
  IOrderBy,
  IPaginatinInputDTO,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

export interface WhereDataFindAllSubscriptionContractsByItemDTO {
  app?: IWhereData;
  parent?: IWhereDataSearch;
  status?: SubscriptionContractStatus;
  product?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllSubscriptionContractsByItemDTO =
  keyof WhereDataFindAllSubscriptionContractsByItemDTO;

export interface OrderByDataFindAllSubscriptionContractsByItemDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}

export type IKeysOrderByDataFindAllSubscriptionContractsByItemDTO =
  keyof OrderByDataFindAllSubscriptionContractsByItemDTO;

export interface FindAllSubscriptionContractsByItemDTO {
  where?: WhereDataFindAllSubscriptionContractsByItemDTO;
  orderBy?: OrderByDataFindAllSubscriptionContractsByItemDTO;
  page?: IPaginatinInputDTO;
}
