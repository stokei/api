import { CreatePriceTierDTO } from '@/dtos/price-tiers/create-price-tier.dto';
import { CreateRecurringDTO } from '@/dtos/recurrings/create-recurring.dto';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';

export type CreatePriceTiersDTO = Omit<CreatePriceTierDTO, 'parent'>[];

export interface CreatePriceDTO {
  parent: string;
  nickname?: string;
  defaultPrice?: boolean;
  fromAmount?: number;
  tiers?: CreatePriceTiersDTO;
  amount?: number;
  unit?: string;
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
