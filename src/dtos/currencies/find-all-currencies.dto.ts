import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCurrenciesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCurrenciesDTO =
  keyof WhereDataFindAllCurrenciesDTO;

export interface OrderByDataFindAllCurrenciesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCurrenciesDTO =
  keyof OrderByDataFindAllCurrenciesDTO;

export type FindAllCurrenciesDTO = IBaseFindManyDTO<
  WhereDataFindAllCurrenciesDTO,
  OrderByDataFindAllCurrenciesDTO
>;
