import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCheckoutsCurrenciesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCheckoutsCurrenciesDTO =
  keyof WhereDataFindAllCheckoutsCurrenciesDTO;

export interface OrderByDataFindAllCheckoutsCurrenciesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCheckoutsCurrenciesDTO =
  keyof OrderByDataFindAllCheckoutsCurrenciesDTO;

export type FindAllCheckoutsCurrenciesDTO = IBaseFindManyDTO<
  WhereDataFindAllCheckoutsCurrenciesDTO,
  OrderByDataFindAllCheckoutsCurrenciesDTO
>;
