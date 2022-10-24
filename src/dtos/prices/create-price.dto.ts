import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { IntervalType } from '@/enums/interval-type.enum';

export interface CreatePriceDTO {
  parent: string;
  default?: boolean;
  fromAmount?: number;
  amount: number;
  currency: string;
  type: PriceType;
  inventoryType: InventoryType;
  recurringIntervalCount?: number;
  recurringIntervalType?: IntervalType;
  quantity?: number;
  app: string;
  createdBy: string;
}
