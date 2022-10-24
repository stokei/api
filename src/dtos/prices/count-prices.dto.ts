import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { IntervalType } from '@/enums/interval-type.enum';

export interface CountPricesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  currency?: IWhereData;
  default?: IWhereData<boolean>;
  type?: PriceType;
  inventoryType?: InventoryType;
  recurringIntervalCount?: IWhereData<number>;
  recurringIntervalType?: IntervalType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPricesWhereDTO = keyof CountPricesWhereDTO;

export type CountPricesDTO = IBaseCountDTO<CountPricesWhereDTO>;
