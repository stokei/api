import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCategoriesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCategoriesDTO =
  keyof WhereDataFindAllCategoriesDTO;

export interface OrderByDataFindAllCategoriesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCategoriesDTO =
  keyof OrderByDataFindAllCategoriesDTO;

export type FindAllCategoriesDTO = IBaseFindManyDTO<
  WhereDataFindAllCategoriesDTO,
  OrderByDataFindAllCategoriesDTO
>;
