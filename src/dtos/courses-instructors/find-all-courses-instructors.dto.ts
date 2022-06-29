import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCoursesInstructorsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCoursesInstructorsDTO =
  keyof WhereDataFindAllCoursesInstructorsDTO;

export interface OrderByDataFindAllCoursesInstructorsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCoursesInstructorsDTO =
  keyof OrderByDataFindAllCoursesInstructorsDTO;

export type FindAllCoursesInstructorsDTO = IBaseFindManyDTO<
  WhereDataFindAllCoursesInstructorsDTO,
  OrderByDataFindAllCoursesInstructorsDTO
>;
