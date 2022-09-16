import { WebhookStripeService } from './stripe';
import { WebhookStripeCheckoutInvoiceCreatedService } from './stripe-checkout-invoice-created';

export const WebhookServices = [
  WebhookStripeCheckoutInvoiceCreatedService,
  WebhookStripeService
];
