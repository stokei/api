import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPriceTiersDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  amount?: IWhereData<number>;
  upTo?: IWhereData<number>;
  infinite?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPriceTiersDTO =
  keyof WhereDataFindAllPriceTiersDTO;

export interface OrderByDataFindAllPriceTiersDTO {
  amount?: IOrderBy;
  upTo?: IOrderBy;
  infinite?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPriceTiersDTO =
  keyof OrderByDataFindAllPriceTiersDTO;

export type FindAllPriceTiersDTO = IBaseFindManyDTO<
  WhereDataFindAllPriceTiersDTO,
  OrderByDataFindAllPriceTiersDTO
>;
