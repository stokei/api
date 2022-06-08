import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllModulesMaterialsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllModulesMaterialsDTO =
  keyof WhereDataFindAllModulesMaterialsDTO;

export interface OrderByDataFindAllModulesMaterialsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllModulesMaterialsDTO =
  keyof OrderByDataFindAllModulesMaterialsDTO;

export type FindAllModulesMaterialsDTO = IBaseFindManyDTO<
  WhereDataFindAllModulesMaterialsDTO,
  OrderByDataFindAllModulesMaterialsDTO
>;
