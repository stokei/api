import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProductsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  checkoutVisible?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllProductsDTO =
  keyof WhereDataFindAllProductsDTO;

export interface OrderByDataFindAllProductsDTO {
  name?: IOrderBy;
  description?: IOrderBy;
  app?: IOrderBy;
  stripeProduct?: IOrderBy;
  checkoutVisible?: IOrderBy;
  avatar?: IOrderBy;
  active?: IOrderBy;
  activatedAt?: IOrderBy;
  deactivatedAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProductsDTO =
  keyof OrderByDataFindAllProductsDTO;

export type FindAllProductsDTO = IBaseFindManyDTO<
  WhereDataFindAllProductsDTO,
  OrderByDataFindAllProductsDTO
>;
