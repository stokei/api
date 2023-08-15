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
  product?: IWhereDataSearch;
  price?: IWhereData;
  recurring?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllOrderItemsDTO =
  keyof WhereDataFindAllOrderItemsDTO;

export interface OrderByDataFindAllOrderItemsDTO {
  quantity?: IOrderBy;
  totalAmount?: IOrderBy;
  subtotalAmount?: IOrderBy;
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
