import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllFeaturesDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch<string | string[]>;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllFeaturesDTO =
  keyof WhereDataFindAllFeaturesDTO;

export interface OrderByDataFindAllFeaturesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllFeaturesDTO =
  keyof OrderByDataFindAllFeaturesDTO;

export type FindAllFeaturesDTO = IBaseFindManyDTO<
  WhereDataFindAllFeaturesDTO,
  OrderByDataFindAllFeaturesDTO
>;
