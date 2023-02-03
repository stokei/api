import { ICommand } from '@nestjs/cqrs';

import {
  CreatePriceDTO,
  CreatePriceTiersDTO
} from '@/dtos/prices/create-price.dto';
import { CreateRecurringDTO } from '@/dtos/recurrings/create-recurring.dto';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';

export class CreatePriceCommand implements ICommand, CreatePriceDTO {
  parent: string;
  nickname?: string;
  defaultPrice?: boolean;
  unit?: string;
  fromAmount?: number;
  amount: number;
  currency: string;
  type: PriceType;
  tiers?: CreatePriceTiersDTO;
  inventoryType: InventoryType;
  billingScheme: BillingScheme;
  tiersMode: TiersMode;
  recurring?: CreateRecurringDTO;
  quantity?: number;
  app: string;
  createdBy: string;

  constructor(data: CreatePriceDTO) {
    this.parent = data.parent;
    this.nickname = data.nickname;
    this.defaultPrice = data.defaultPrice;
    this.unit = data.unit;
    this.fromAmount = data.fromAmount;
    this.amount = data.amount;
    this.tiers = data.tiers;
    this.currency = data.currency;
    this.type = data.type;
    this.inventoryType = data.inventoryType;
    this.billingScheme = data.billingScheme;
    this.tiersMode = data.tiersMode;
    this.recurring = data.recurring;
    this.quantity = data.quantity;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
