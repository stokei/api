import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsPlansDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsPlansDTO =
  keyof WhereDataFindAllClassroomsPlansDTO;

export interface OrderByDataFindAllClassroomsPlansDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsPlansDTO =
  keyof OrderByDataFindAllClassroomsPlansDTO;

export type FindAllClassroomsPlansDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsPlansDTO,
  OrderByDataFindAllClassroomsPlansDTO
>;
