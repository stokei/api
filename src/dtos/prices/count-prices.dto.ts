import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface CountPricesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  default?: IWhereData<boolean>;
  type?: IWhereData<PriceType>;
  inventoryType?: IWhereData<InventoryType>;
  recurringIntervalCount?: IWhereData<number>;
  recurringIntervalType?: IWhereData<RecurringType>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPricesWhereDTO = keyof CountPricesWhereDTO;

export type CountPricesDTO = IBaseCountDTO<CountPricesWhereDTO>;
