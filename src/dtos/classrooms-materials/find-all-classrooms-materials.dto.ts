import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsMaterialsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsMaterialsDTO =
  keyof WhereDataFindAllClassroomsMaterialsDTO;

export interface OrderByDataFindAllClassroomsMaterialsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsMaterialsDTO =
  keyof OrderByDataFindAllClassroomsMaterialsDTO;

export type FindAllClassroomsMaterialsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsMaterialsDTO,
  OrderByDataFindAllClassroomsMaterialsDTO
>;
