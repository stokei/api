import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCourseInstructorsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCourseInstructorsDTO =
  keyof WhereDataFindAllCourseInstructorsDTO;

export interface OrderByDataFindAllCourseInstructorsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCourseInstructorsDTO =
  keyof OrderByDataFindAllCourseInstructorsDTO;

export type FindAllCourseInstructorsDTO = IBaseFindManyDTO<
  WhereDataFindAllCourseInstructorsDTO,
  OrderByDataFindAllCourseInstructorsDTO
>;
