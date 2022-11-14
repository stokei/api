import Stripe from 'stripe';

import { CreatePriceTierDTO } from '@/dtos/price-tiers/create-price-tier.dto';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringModel } from '@/models/recurring.model';

export interface CreateStripePriceDTO {
  app: string;
  amount?: number;
  currency: string;
  tiers?: Omit<CreatePriceTierDTO, 'parent'>[];
  billingScheme: Stripe.Price.BillingScheme;
  tiersMode: Stripe.Price.TiersMode;
  type: PriceType;
  recurring: RecurringModel;
  stripeProduct: string;
  stripeAccount: string;
}
