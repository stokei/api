import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCommentsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCommentsDTO =
  keyof WhereDataFindAllCommentsDTO;

export interface OrderByDataFindAllCommentsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCommentsDTO =
  keyof OrderByDataFindAllCommentsDTO;

export type FindAllCommentsDTO = IBaseFindManyDTO<
  WhereDataFindAllCommentsDTO,
  OrderByDataFindAllCommentsDTO
>;
