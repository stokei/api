import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsInstructorsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsInstructorsDTO =
  keyof WhereDataFindAllClassroomsInstructorsDTO;

export interface OrderByDataFindAllClassroomsInstructorsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsInstructorsDTO =
  keyof OrderByDataFindAllClassroomsInstructorsDTO;

export type FindAllClassroomsInstructorsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsInstructorsDTO,
  OrderByDataFindAllClassroomsInstructorsDTO
>;
