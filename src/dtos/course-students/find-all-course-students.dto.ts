import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCourseStudentsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCourseStudentsDTO =
  keyof WhereDataFindAllCourseStudentsDTO;

export interface OrderByDataFindAllCourseStudentsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCourseStudentsDTO =
  keyof OrderByDataFindAllCourseStudentsDTO;

export type FindAllCourseStudentsDTO = IBaseFindManyDTO<
  WhereDataFindAllCourseStudentsDTO,
  OrderByDataFindAllCourseStudentsDTO
>;
