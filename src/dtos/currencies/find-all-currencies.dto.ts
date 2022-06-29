import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCurrenciesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCurrenciesDTO =
  keyof WhereDataFindAllCurrenciesDTO;

export interface OrderByDataFindAllCurrenciesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCurrenciesDTO =
  keyof OrderByDataFindAllCurrenciesDTO;

export type FindAllCurrenciesDTO = IBaseFindManyDTO<
  WhereDataFindAllCurrenciesDTO,
  OrderByDataFindAllCurrenciesDTO
>;
