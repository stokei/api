import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllRolesDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllRolesDTO = keyof WhereDataFindAllRolesDTO;

export interface OrderByDataFindAllRolesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllRolesDTO = keyof OrderByDataFindAllRolesDTO;

export type FindAllRolesDTO = IBaseFindManyDTO<
  WhereDataFindAllRolesDTO,
  OrderByDataFindAllRolesDTO
>;
