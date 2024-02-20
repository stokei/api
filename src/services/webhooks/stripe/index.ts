import { WebhookStripePaymentFailedService } from './stripe-payment-failed';
import { WebhookStripePaymentSucceededService } from './stripe-payment-succeeded';
import { WebhookStripeService } from './webhook';

export const WebhookStripeServices = [
  WebhookStripeService,
  WebhookStripePaymentFailedService,
  WebhookStripePaymentSucceededService
];
