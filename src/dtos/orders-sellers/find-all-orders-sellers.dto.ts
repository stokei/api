import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllOrdersSellersDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllOrdersSellersDTO =
  keyof WhereDataFindAllOrdersSellersDTO;

export interface OrderByDataFindAllOrdersSellersDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllOrdersSellersDTO =
  keyof OrderByDataFindAllOrdersSellersDTO;

export type FindAllOrdersSellersDTO = IBaseFindManyDTO<
  WhereDataFindAllOrdersSellersDTO,
  OrderByDataFindAllOrdersSellersDTO
>;
