import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllSubscriptionContractItemsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  product?: IWhereDataSearch;
  price?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllSubscriptionContractItemsDTO =
  keyof WhereDataFindAllSubscriptionContractItemsDTO;

export interface OrderByDataFindAllSubscriptionContractItemsDTO {
  quantity?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllSubscriptionContractItemsDTO =
  keyof OrderByDataFindAllSubscriptionContractItemsDTO;

export type FindAllSubscriptionContractItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllSubscriptionContractItemsDTO,
  OrderByDataFindAllSubscriptionContractItemsDTO
>;
