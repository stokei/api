import { WebhookStripeService } from './stripe';
import { WebhookStripeInvoiceCreatedService } from './stripe-invoice-created';
import { WebhookStripeInvoicePaidService } from './stripe-invoice-paid';
import { WebhookStripeInvoiceWithPaymentErrorService } from './stripe-invoice-with-payment-error';
import { WebhookStripeSubscriptionContractCanceledService } from './stripe-subscription-contract-canceled';

export const WebhookServices = [
  WebhookStripeService,
  WebhookStripeInvoiceCreatedService,
  WebhookStripeSubscriptionContractCanceledService,
  WebhookStripeInvoicePaidService,
  WebhookStripeInvoiceWithPaymentErrorService
];
