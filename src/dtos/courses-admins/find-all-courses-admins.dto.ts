import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCoursesAdminsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCoursesAdminsDTO =
  keyof WhereDataFindAllCoursesAdminsDTO;

export interface OrderByDataFindAllCoursesAdminsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCoursesAdminsDTO =
  keyof OrderByDataFindAllCoursesAdminsDTO;

export type FindAllCoursesAdminsDTO = IBaseFindManyDTO<
  WhereDataFindAllCoursesAdminsDTO,
  OrderByDataFindAllCoursesAdminsDTO
>;
