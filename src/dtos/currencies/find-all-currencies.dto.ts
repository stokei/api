import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCurrenciesDTO {
  ids?: string[];
  name?: IWhereDataSearch;
  minorUnit?: IWhereData<number>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCurrenciesDTO =
  keyof WhereDataFindAllCurrenciesDTO;

export interface OrderByDataFindAllCurrenciesDTO {
  name?: IOrderBy;
  minorUnit?: IOrderBy;
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
