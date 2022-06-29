import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllModulesVideosDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllModulesVideosDTO =
  keyof WhereDataFindAllModulesVideosDTO;

export interface OrderByDataFindAllModulesVideosDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllModulesVideosDTO =
  keyof OrderByDataFindAllModulesVideosDTO;

export type FindAllModulesVideosDTO = IBaseFindManyDTO<
  WhereDataFindAllModulesVideosDTO,
  OrderByDataFindAllModulesVideosDTO
>;
