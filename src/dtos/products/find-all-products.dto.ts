import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { ProductType } from '@/enums/product-type.enum';

export interface WhereDataFindAllProductsDTO {
  ids?: string[];
  app?: IWhereData;
  type?: ProductType;
  parent?: IWhereDataSearch;
  externalReference?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllProductsDTO =
  keyof WhereDataFindAllProductsDTO;

export interface OrderByDataFindAllProductsDTO {
  name?: IOrderBy;
  type?: IOrderBy;
  description?: IOrderBy;
  app?: IOrderBy;
  stripeProduct?: IOrderBy;
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
