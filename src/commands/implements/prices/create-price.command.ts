import { ICommand } from '@nestjs/cqrs';

import { CreatePriceDTO } from '@/dtos/prices/create-price.dto';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export class CreatePriceCommand implements ICommand, CreatePriceDTO {
  parent: string;
  default: boolean;
  fromAmount?: number;
  amount: number;
  currency: string;
  type: PriceType;
  inventoryType: InventoryType;
  recurringIntervalCount: number;
  recurringIntervalType: RecurringType;
  quantity: number;
  app: string;
  createdBy: string;

  constructor(data: CreatePriceDTO) {
    this.parent = data.parent;
    this.default = data.default;
    this.fromAmount = data.fromAmount;
    this.amount = data.amount;
    this.currency = data.currency;
    this.type = data.type;
    this.inventoryType = data.inventoryType;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.quantity = data.quantity;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
