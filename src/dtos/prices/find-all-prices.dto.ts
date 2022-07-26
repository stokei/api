import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface WhereDataFindAllPricesDTO {
  ids?: string[];
  parent?: IWhereData;
  default?: IWhereData<boolean>;
  type?: PriceType;
  inventoryType?: InventoryType;
  recurringIntervalCount?: IWhereData<number>;
  recurringIntervalType?: RecurringType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPricesDTO = keyof WhereDataFindAllPricesDTO;

export interface OrderByDataFindAllPricesDTO {
  default?: IOrderBy;
  amount?: IOrderBy;
  fromAmount?: IOrderBy;
  toAmount?: IOrderBy;
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
