import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomStudentsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomStudentsDTO =
  keyof WhereDataFindAllClassroomStudentsDTO;

export interface OrderByDataFindAllClassroomStudentsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomStudentsDTO =
  keyof OrderByDataFindAllClassroomStudentsDTO;

export type FindAllClassroomStudentsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomStudentsDTO,
  OrderByDataFindAllClassroomStudentsDTO
>;
