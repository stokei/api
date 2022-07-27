import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllCourseStudentsDTO {
  ids?: string[];
  app?: IWhereData;
  course?: IWhereData;
  student?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCourseStudentsDTO =
  keyof WhereDataFindAllCourseStudentsDTO;

export interface OrderByDataFindAllCourseStudentsDTO {
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
