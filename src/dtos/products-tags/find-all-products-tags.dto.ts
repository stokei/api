import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProductsTagsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllProductsTagsDTO =
  keyof WhereDataFindAllProductsTagsDTO;

export interface OrderByDataFindAllProductsTagsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProductsTagsDTO =
  keyof OrderByDataFindAllProductsTagsDTO;

export type FindAllProductsTagsDTO = IBaseFindManyDTO<
  WhereDataFindAllProductsTagsDTO,
  OrderByDataFindAllProductsTagsDTO
>;
