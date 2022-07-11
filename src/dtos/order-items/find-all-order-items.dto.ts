import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllOrderItemsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
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
