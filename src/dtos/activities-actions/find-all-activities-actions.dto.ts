import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllActivitiesActionsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllActivitiesActionsDTO =
  keyof WhereDataFindAllActivitiesActionsDTO;

export interface OrderByDataFindAllActivitiesActionsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllActivitiesActionsDTO =
  keyof OrderByDataFindAllActivitiesActionsDTO;

export type FindAllActivitiesActionsDTO = IBaseFindManyDTO<
  WhereDataFindAllActivitiesActionsDTO,
  OrderByDataFindAllActivitiesActionsDTO
>;
