import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsStudentsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsStudentsDTO =
  keyof WhereDataFindAllClassroomsStudentsDTO;

export interface OrderByDataFindAllClassroomsStudentsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsStudentsDTO =
  keyof OrderByDataFindAllClassroomsStudentsDTO;

export type FindAllClassroomsStudentsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsStudentsDTO,
  OrderByDataFindAllClassroomsStudentsDTO
>;
