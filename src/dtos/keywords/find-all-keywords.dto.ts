import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllKeywordsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllKeywordsDTO =
  keyof WhereDataFindAllKeywordsDTO;

export interface OrderByDataFindAllKeywordsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllKeywordsDTO =
  keyof OrderByDataFindAllKeywordsDTO;

export type FindAllKeywordsDTO = IBaseFindManyDTO<
  WhereDataFindAllKeywordsDTO,
  OrderByDataFindAllKeywordsDTO
>;
