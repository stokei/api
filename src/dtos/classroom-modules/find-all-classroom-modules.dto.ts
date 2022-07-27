import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllClassroomModulesDTO {
  ids?: string[];
  app?: IWhereData;
  classroom?: IWhereData;
  module?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllClassroomModulesDTO =
  keyof WhereDataFindAllClassroomModulesDTO;

export interface OrderByDataFindAllClassroomModulesDTO {
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
