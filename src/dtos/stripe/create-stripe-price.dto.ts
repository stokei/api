import { PriceType } from '@/enums/price-type.enum';
import { RecurringModel } from '@/models/recurring.model';

export interface CreateStripePriceDTO {
  app: string;
  amount: number;
  currency: string;
  type: PriceType;
  recurring: RecurringModel;
  stripeProduct: string;
  stripeAccount: string;
}
