import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCoursesInstructorsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCoursesInstructorsDTO =
  keyof WhereDataFindAllCoursesInstructorsDTO;

export interface OrderByDataFindAllCoursesInstructorsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCoursesInstructorsDTO =
  keyof OrderByDataFindAllCoursesInstructorsDTO;

export type FindAllCoursesInstructorsDTO = IBaseFindManyDTO<
  WhereDataFindAllCoursesInstructorsDTO,
  OrderByDataFindAllCoursesInstructorsDTO
>;
