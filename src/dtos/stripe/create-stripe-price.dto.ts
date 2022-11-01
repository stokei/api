import Stripe from 'stripe';

import { PriceType } from '@/enums/price-type.enum';
import { PriceTierModel } from '@/models/price-tier.model';
import { RecurringModel } from '@/models/recurring.model';

export interface CreateStripePriceDTO {
  app: string;
  amount?: number;
  currency: string;
  tiers?: PriceTierModel[];
  billingScheme: Stripe.Price.BillingScheme;
  tiersMode: Stripe.Price.TiersMode;
  type: PriceType;
  recurring: RecurringModel;
  stripeProduct: string;
  stripeAccount: string;
}
