import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCartsItemsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCartsItemsDTO =
  keyof WhereDataFindAllCartsItemsDTO;

export interface OrderByDataFindAllCartsItemsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCartsItemsDTO =
  keyof OrderByDataFindAllCartsItemsDTO;

export type FindAllCartsItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllCartsItemsDTO,
  OrderByDataFindAllCartsItemsDTO
>;
