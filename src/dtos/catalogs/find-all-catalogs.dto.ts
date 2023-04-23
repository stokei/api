import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCatalogsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  title?: IWhereDataSearch;
  subtitle?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCatalogsDTO =
  keyof WhereDataFindAllCatalogsDTO;

export interface OrderByDataFindAllCatalogsDTO {
  title?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCatalogsDTO =
  keyof OrderByDataFindAllCatalogsDTO;

export type FindAllCatalogsDTO = IBaseFindManyDTO<
  WhereDataFindAllCatalogsDTO,
  OrderByDataFindAllCatalogsDTO
>;
