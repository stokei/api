import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsDTO =
  keyof WhereDataFindAllClassroomsDTO;

export interface OrderByDataFindAllClassroomsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsDTO =
  keyof OrderByDataFindAllClassroomsDTO;

export type FindAllClassroomsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsDTO,
  OrderByDataFindAllClassroomsDTO
>;
