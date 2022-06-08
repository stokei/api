import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPricesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPricesDTO = keyof WhereDataFindAllPricesDTO;

export interface OrderByDataFindAllPricesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPricesDTO =
  keyof OrderByDataFindAllPricesDTO;

export type FindAllPricesDTO = IBaseFindManyDTO<
  WhereDataFindAllPricesDTO,
  OrderByDataFindAllPricesDTO
>;
