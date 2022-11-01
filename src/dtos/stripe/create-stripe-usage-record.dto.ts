import Stripe from 'stripe';

export interface CreateStripeUsageRecordDTO {
  subscriptionItem: string;
  action: Stripe.UsageRecordCreateParams.Action;
  quantity: number;
  stripeAccount: string;
}
