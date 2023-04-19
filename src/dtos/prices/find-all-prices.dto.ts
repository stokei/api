import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { BillingScheme } from '@/enums/billing-scheme.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';

export interface WhereDataFindAllPricesDTO {
  ids?: string[];
  app?: IWhereData;
  currency?: IWhereData;
  unit?: IWhereData;
  active?: IWhereData<boolean>;
  parent?: IWhereDataSearch;
  type?: PriceType;
  inventoryType?: InventoryType;
  billingScheme?: BillingScheme;
  tiersMode?: TiersMode;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPricesDTO = keyof WhereDataFindAllPricesDTO;

export interface OrderByDataFindAllPricesDTO {
  fromAmount?: IOrderBy;
  currency?: IOrderBy;
  unit?: IOrderBy;
  active?: IOrderBy;
  amount?: IOrderBy;
  type?: IOrderBy;
  inventoryType?: IOrderBy;
  billingScheme?: IOrderBy;
  tiersMode?: IOrderBy;
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
