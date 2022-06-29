import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllOrdersItemsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllOrdersItemsDTO =
  keyof WhereDataFindAllOrdersItemsDTO;

export interface OrderByDataFindAllOrdersItemsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllOrdersItemsDTO =
  keyof OrderByDataFindAllOrdersItemsDTO;

export type FindAllOrdersItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllOrdersItemsDTO,
  OrderByDataFindAllOrdersItemsDTO
>;
