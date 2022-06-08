import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllRatingsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllRatingsDTO = keyof WhereDataFindAllRatingsDTO;

export interface OrderByDataFindAllRatingsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllRatingsDTO =
  keyof OrderByDataFindAllRatingsDTO;

export type FindAllRatingsDTO = IBaseFindManyDTO<
  WhereDataFindAllRatingsDTO,
  OrderByDataFindAllRatingsDTO
>;
