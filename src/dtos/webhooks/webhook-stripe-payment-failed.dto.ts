import Stripe from 'stripe';

export interface WebhookStripePaymentFailedDTO {
  stripePaymentIntent: Stripe.PaymentIntent;
  stripeAccount?: string;
}
