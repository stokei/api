import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsTagsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsTagsDTO =
  keyof WhereDataFindAllClassroomsTagsDTO;

export interface OrderByDataFindAllClassroomsTagsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsTagsDTO =
  keyof OrderByDataFindAllClassroomsTagsDTO;

export type FindAllClassroomsTagsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsTagsDTO,
  OrderByDataFindAllClassroomsTagsDTO
>;
