import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { SubscriptionStatus } from '@/enums/subscription-status.enum';
import { SubscriptionType } from '@/enums/subscription-type.enum';

export interface WhereDataFindAllSubscriptionsDTO {
  ids?: string[];
  parent?: IWhereData;
  product?: IWhereData<string>;
  status?: IWhereData<SubscriptionStatus>;
  type?: IWhereData<SubscriptionType>;
  active?: IWhereData<boolean>;
  automaticRenew?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllSubscriptionsDTO =
  keyof WhereDataFindAllSubscriptionsDTO;

export interface OrderByDataFindAllSubscriptionsDTO {
  status?: IOrderBy;
  type?: IOrderBy;
  active?: IOrderBy;
  automaticRenew?: IOrderBy;
  startAt?: IOrderBy;
  endAt?: IOrderBy;
  canceledAt?: string;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllSubscriptionsDTO =
  keyof OrderByDataFindAllSubscriptionsDTO;

export type FindAllSubscriptionsDTO = IBaseFindManyDTO<
  WhereDataFindAllSubscriptionsDTO,
  OrderByDataFindAllSubscriptionsDTO
>;
