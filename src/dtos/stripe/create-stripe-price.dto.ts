import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface CreateStripePriceDTO {
  parent: string;
  amount: number;
  currency: string;
  type: PriceType;
  recurringIntervalCount: number;
  recurringIntervalType: RecurringType;
  stripeProduct: string;
  stripeAccount: string;
}
