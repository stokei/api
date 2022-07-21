import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface UpdatePriceDataDTO {
  default?: boolean;
  fromAmount?: number;
  toAmount?: number;
  type?: PriceType;
  inventoryType?: InventoryType;
  recurringIntervalCount?: number;
  recurringIntervalType?: RecurringType;
  quantity?: number;
  updatedBy: string;
}

export interface UpdatePriceWhereDTO {
  priceId: string;
}

export interface UpdatePriceDTO {
  data: UpdatePriceDataDTO;
  where: UpdatePriceWhereDTO;
}
