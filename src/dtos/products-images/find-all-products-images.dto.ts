import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProductsImagesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllProductsImagesDTO =
  keyof WhereDataFindAllProductsImagesDTO;

export interface OrderByDataFindAllProductsImagesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProductsImagesDTO =
  keyof OrderByDataFindAllProductsImagesDTO;

export type FindAllProductsImagesDTO = IBaseFindManyDTO<
  WhereDataFindAllProductsImagesDTO,
  OrderByDataFindAllProductsImagesDTO
>;
