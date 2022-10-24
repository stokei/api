import { PriceType } from '@/enums/price-type.enum';
import { IntervalType } from '@/enums/interval-type.enum';

export interface CreateStripePriceDTO {
  app: string;
  amount: number;
  currency: string;
  type: PriceType;
  recurringIntervalCount: number;
  recurringIntervalType: IntervalType;
  stripeProduct: string;
  stripeAccount: string;
}
