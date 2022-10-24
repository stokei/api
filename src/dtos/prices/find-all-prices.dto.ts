import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { IntervalType } from '@/enums/interval-type.enum';

export interface WhereDataFindAllPricesDTO {
  ids?: string[];
  app?: IWhereData;
  currency?: IWhereData;
  parent?: IWhereDataSearch;
  default?: IWhereData<boolean>;
  type?: PriceType;
  inventoryType?: InventoryType;
  recurringIntervalCount?: IWhereData<number>;
  recurringIntervalType?: IntervalType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPricesDTO = keyof WhereDataFindAllPricesDTO;

export interface OrderByDataFindAllPricesDTO {
  default?: IOrderBy;
  fromAmount?: IOrderBy;
  currency?: IOrderBy;
  amount?: IOrderBy;
  type?: IOrderBy;
  inventoryType?: IOrderBy;
  recurringIntervalCount?: IOrderBy;
  recurringIntervalType?: IOrderBy;
  quantity?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPricesDTO =
  keyof OrderByDataFindAllPricesDTO;

export type FindAllPricesDTO = IBaseFindManyDTO<
  WhereDataFindAllPricesDTO,
  OrderByDataFindAllPricesDTO
>;
