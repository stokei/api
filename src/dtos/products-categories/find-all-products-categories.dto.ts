import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProductsCategoriesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllProductsCategoriesDTO =
  keyof WhereDataFindAllProductsCategoriesDTO;

export interface OrderByDataFindAllProductsCategoriesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProductsCategoriesDTO =
  keyof OrderByDataFindAllProductsCategoriesDTO;

export type FindAllProductsCategoriesDTO = IBaseFindManyDTO<
  WhereDataFindAllProductsCategoriesDTO,
  OrderByDataFindAllProductsCategoriesDTO
>;
