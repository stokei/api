import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsModulesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsModulesDTO =
  keyof WhereDataFindAllClassroomsModulesDTO;

export interface OrderByDataFindAllClassroomsModulesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsModulesDTO =
  keyof OrderByDataFindAllClassroomsModulesDTO;

export type FindAllClassroomsModulesDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsModulesDTO,
  OrderByDataFindAllClassroomsModulesDTO
>;
