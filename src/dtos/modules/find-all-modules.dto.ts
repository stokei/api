import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllModulesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllModulesDTO = keyof WhereDataFindAllModulesDTO;

export interface OrderByDataFindAllModulesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllModulesDTO =
  keyof OrderByDataFindAllModulesDTO;

export type FindAllModulesDTO = IBaseFindManyDTO<
  WhereDataFindAllModulesDTO,
  OrderByDataFindAllModulesDTO
>;
