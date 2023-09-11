import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPagesDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  title?: IWhereDataSearch;
  slug?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPagesDTO = keyof WhereDataFindAllPagesDTO;

export interface OrderByDataFindAllPagesDTO {
  title?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPagesDTO = keyof OrderByDataFindAllPagesDTO;

export type FindAllPagesDTO = IBaseFindManyDTO<
  WhereDataFindAllPagesDTO,
  OrderByDataFindAllPagesDTO
>;
