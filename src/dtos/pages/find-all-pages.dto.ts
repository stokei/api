import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPagesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPagesDTO = keyof WhereDataFindAllPagesDTO;

export interface OrderByDataFindAllPagesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPagesDTO = keyof OrderByDataFindAllPagesDTO;

export type FindAllPagesDTO = IBaseFindManyDTO<
  WhereDataFindAllPagesDTO,
  OrderByDataFindAllPagesDTO
>;
