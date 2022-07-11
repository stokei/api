import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomModulesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomModulesDTO =
  keyof WhereDataFindAllClassroomModulesDTO;

export interface OrderByDataFindAllClassroomModulesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomModulesDTO =
  keyof OrderByDataFindAllClassroomModulesDTO;

export type FindAllClassroomModulesDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomModulesDTO,
  OrderByDataFindAllClassroomModulesDTO
>;
