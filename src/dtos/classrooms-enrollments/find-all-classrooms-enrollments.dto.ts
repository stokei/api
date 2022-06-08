import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsEnrollmentsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsEnrollmentsDTO =
  keyof WhereDataFindAllClassroomsEnrollmentsDTO;

export interface OrderByDataFindAllClassroomsEnrollmentsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsEnrollmentsDTO =
  keyof OrderByDataFindAllClassroomsEnrollmentsDTO;

export type FindAllClassroomsEnrollmentsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsEnrollmentsDTO,
  OrderByDataFindAllClassroomsEnrollmentsDTO
>;
