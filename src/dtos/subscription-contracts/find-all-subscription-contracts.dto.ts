import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface WhereDataFindAllSubscriptionContractsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  product?: IWhereData<string>;
  status?: SubscriptionContractStatus;
  type?: SubscriptionContractType;
  active?: IWhereData<boolean>;
  automaticRenew?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllSubscriptionContractsDTO =
  keyof WhereDataFindAllSubscriptionContractsDTO;

export interface OrderByDataFindAllSubscriptionContractsDTO {
  status?: IOrderBy;
  type?: IOrderBy;
  active?: IOrderBy;
  automaticRenew?: IOrderBy;
  startAt?: IOrderBy;
  endAt?: IOrderBy;
  canceledAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllSubscriptionContractsDTO =
  keyof OrderByDataFindAllSubscriptionContractsDTO;

export type FindAllSubscriptionContractsDTO = IBaseFindManyDTO<
  WhereDataFindAllSubscriptionContractsDTO,
  OrderByDataFindAllSubscriptionContractsDTO
>;