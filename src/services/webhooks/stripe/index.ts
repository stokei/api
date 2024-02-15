import { WebhookStripeCheckoutSessionAsyncPaymentFailedService } from './stripe-checkout-session-async-payment-failed';
import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from './stripe-checkout-session-async-payment-succeeded';
import { WebhookStripeCheckoutSessionService } from './stripe-checkout-session-completed';
import { WebhookStripeService } from './webhook';

export const WebhookStripeServices = [
  WebhookStripeService,
  WebhookStripeCheckoutSessionService,
  WebhookStripeCheckoutSessionAsyncPaymentSucceededService,
  WebhookStripeCheckoutSessionAsyncPaymentFailedService
];
