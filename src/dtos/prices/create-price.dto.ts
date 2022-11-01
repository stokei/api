import { CreatePriceTierDTO } from '@/dtos/price-tiers/create-price-tier.dto';
import { CreateRecurringDTO } from '@/dtos/recurrings/create-recurring.dto';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';

export interface CreatePriceDTO {
  parent: string;
  default?: boolean;
  fromAmount?: number;
  tiers?: CreatePriceTierDTO[];
  amount: number;
  currency: string;
  type: PriceType;
  inventoryType: InventoryType;
  billingScheme: BillingScheme;
  tiersMode: TiersMode;
  recurring?: CreateRecurringDTO;
  quantity?: number;
  app: string;
  createdBy: string;
}
