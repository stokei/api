import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllActivitiesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllActivitiesDTO =
  keyof WhereDataFindAllActivitiesDTO;

export interface OrderByDataFindAllActivitiesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllActivitiesDTO =
  keyof OrderByDataFindAllActivitiesDTO;

export type FindAllActivitiesDTO = IBaseFindManyDTO<
  WhereDataFindAllActivitiesDTO,
  OrderByDataFindAllActivitiesDTO
>;
