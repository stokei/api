import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { BillingScheme } from '@/enums/billing-scheme.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';

export interface CountPricesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  currency?: IWhereData;
  type?: PriceType;
  inventoryType?: InventoryType;
  billingScheme?: BillingScheme;
  tiersMode?: TiersMode;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPricesWhereDTO = keyof CountPricesWhereDTO;

export type CountPricesDTO = IBaseCountDTO<CountPricesWhereDTO>;
