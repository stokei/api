import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCoursesStudentsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCoursesStudentsDTO =
  keyof WhereDataFindAllCoursesStudentsDTO;

export interface OrderByDataFindAllCoursesStudentsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCoursesStudentsDTO =
  keyof OrderByDataFindAllCoursesStudentsDTO;

export type FindAllCoursesStudentsDTO = IBaseFindManyDTO<
  WhereDataFindAllCoursesStudentsDTO,
  OrderByDataFindAllCoursesStudentsDTO
>;
