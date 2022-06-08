import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProjectsPlansDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllProjectsPlansDTO =
  keyof WhereDataFindAllProjectsPlansDTO;

export interface OrderByDataFindAllProjectsPlansDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProjectsPlansDTO =
  keyof OrderByDataFindAllProjectsPlansDTO;

export type FindAllProjectsPlansDTO = IBaseFindManyDTO<
  WhereDataFindAllProjectsPlansDTO,
  OrderByDataFindAllProjectsPlansDTO
>;
