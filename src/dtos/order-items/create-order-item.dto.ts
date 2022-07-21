import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface CreateOrderItemDTO {
  order: string;
  product: string;
  name: string;
  description?: string;
  fromAmount?: number;
  toAmount: number;
  avatar?: string;
  quantity: number;
  type: PriceType;
  recurringIntervalCount: number;
  recurringIntervalType: RecurringType;
  createdBy: string;
}
