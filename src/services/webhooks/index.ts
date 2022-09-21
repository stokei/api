import { WebhookStripeService } from './stripe';
import { WebhookStripeInvoiceCreatedService } from './stripe-invoice-created';
import { WebhookStripeSubscriptionContractCanceledService } from './stripe-subscription-contract-canceled';

export const WebhookServices = [
  WebhookStripeService,
  WebhookStripeInvoiceCreatedService,
  WebhookStripeSubscriptionContractCanceledService
];
