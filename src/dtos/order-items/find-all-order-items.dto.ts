import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllOrderItemsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllOrderItemsDTO =
  keyof WhereDataFindAllOrderItemsDTO;

export interface OrderByDataFindAllOrderItemsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllOrderItemsDTO =
  keyof OrderByDataFindAllOrderItemsDTO;

export type FindAllOrderItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllOrderItemsDTO,
  OrderByDataFindAllOrderItemsDTO
>;
