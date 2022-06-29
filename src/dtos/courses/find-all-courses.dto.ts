import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCoursesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCoursesDTO = keyof WhereDataFindAllCoursesDTO;

export interface OrderByDataFindAllCoursesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCoursesDTO =
  keyof OrderByDataFindAllCoursesDTO;

export type FindAllCoursesDTO = IBaseFindManyDTO<
  WhereDataFindAllCoursesDTO,
  OrderByDataFindAllCoursesDTO
>;
