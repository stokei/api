import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCoursesDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
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
