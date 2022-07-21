import { ICommand } from '@nestjs/cqrs';

import { CreatePriceDTO } from '@/dtos/prices/create-price.dto';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export class CreatePriceCommand implements ICommand, CreatePriceDTO {
  parent: string;
  default: boolean;
  fromAmount?: number;
  toAmount: number;
  type: PriceType;
  inventoryType: InventoryType;
  recurringIntervalCount: number;
  recurringIntervalType: RecurringType;
  quantity: number;
  createdBy: string;

  constructor(data: CreatePriceDTO) {
    this.parent = data.parent;
    this.default = data.default;
    this.fromAmount = data.fromAmount;
    this.toAmount = data.toAmount;
    this.type = data.type;
    this.inventoryType = data.inventoryType;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.quantity = data.quantity;
    this.createdBy = data.createdBy;
  }
}
