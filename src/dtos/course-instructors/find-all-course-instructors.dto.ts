import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllCourseInstructorsDTO {
  ids?: string[];
  app?: IWhereData;
  course?: IWhereData<string | string[]>;
  instructor?: IWhereData<string | string[]>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCourseInstructorsDTO =
  keyof WhereDataFindAllCourseInstructorsDTO;

export interface OrderByDataFindAllCourseInstructorsDTO {
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
