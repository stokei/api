import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProductsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllProductsDTO =
  keyof WhereDataFindAllProductsDTO;

export interface OrderByDataFindAllProductsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProductsDTO =
  keyof OrderByDataFindAllProductsDTO;

export type FindAllProductsDTO = IBaseFindManyDTO<
  WhereDataFindAllProductsDTO,
  OrderByDataFindAllProductsDTO
>;
