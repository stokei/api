import Stripe from 'stripe';

export interface WebhookStripeCheckoutSessionDTO {
  stripeCheckoutSession: Stripe.Checkout.Session;
  stripeAccount?: string;
}
