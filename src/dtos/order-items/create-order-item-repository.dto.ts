import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

import { CreateOrderItemDTO } from './create-order-item.dto';

export interface CreateOrderItemRepositoryDTO extends CreateOrderItemDTO {
  name: string;
  currency: string;
  amount: number;
  toAmount: number;
  type: PriceType;
  recurringIntervalCount: number;
  recurringIntervalType: RecurringType;
}
