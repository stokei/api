import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllSubscriptionsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllSubscriptionsDTO =
  keyof WhereDataFindAllSubscriptionsDTO;

export interface OrderByDataFindAllSubscriptionsDTO {
  name?: IOrderBy;
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
