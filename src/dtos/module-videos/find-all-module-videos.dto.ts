import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllModuleVideosDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllModuleVideosDTO =
  keyof WhereDataFindAllModuleVideosDTO;

export interface OrderByDataFindAllModuleVideosDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllModuleVideosDTO =
  keyof OrderByDataFindAllModuleVideosDTO;

export type FindAllModuleVideosDTO = IBaseFindManyDTO<
  WhereDataFindAllModuleVideosDTO,
  OrderByDataFindAllModuleVideosDTO
>;
