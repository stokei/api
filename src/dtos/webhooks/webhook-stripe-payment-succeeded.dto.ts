import Stripe from 'stripe';

export interface WebhookStripePaymentSucceededDTO {
  stripePaymentIntent: Stripe.PaymentIntent;
  stripeAccount?: string;
}
