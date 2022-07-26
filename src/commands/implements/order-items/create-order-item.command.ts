import { ICommand } from '@nestjs/cqrs';

import { CreateOrderItemDTO } from '@/dtos/order-items/create-order-item.dto';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export class CreateOrderItemCommand implements ICommand, CreateOrderItemDTO {
  name: string;
  order: string;
  product: string;
  description?: string;
  fromAmount?: number;
  toAmount: number;
  avatar?: string;
  quantity: number;
  type: PriceType;
  recurringIntervalCount: number;
  recurringIntervalType: RecurringType;
  app: string;
  createdBy: string;

  constructor(data: CreateOrderItemDTO) {
    this.name = data.name;
    this.order = data.order;
    this.product = data.product;
    this.description = data.description;
    this.fromAmount = data.fromAmount;
    this.toAmount = data.toAmount;
    this.avatar = data.avatar;
    this.quantity = data.quantity;
    this.type = data.type;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
