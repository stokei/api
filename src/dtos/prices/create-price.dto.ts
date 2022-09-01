import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface CreatePriceDTO {
  parent: string;
  default?: boolean;
  fromAmount?: number;
  amount: number;
  currency: string;
  type: PriceType;
  inventoryType: InventoryType;
  recurringIntervalCount?: number;
  recurringIntervalType?: RecurringType;
  quantity?: number;
  app: string;
  createdBy: string;
}
