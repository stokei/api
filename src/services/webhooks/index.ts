import { WebhookStripeService } from './stripe';
import { WebhookStripeCheckoutSessionAsyncPaymentFailedService } from './stripe-checkout-session-async-payment-failed';
import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from './stripe-checkout-session-async-payment-succeeded';
import { WebhookStripeCheckoutSessionService } from './stripe-checkout-session-completed';
import { WebhookStripeInvoiceCreatedService } from './stripe-invoice-created';
import { WebhookStripeInvoicePaidService } from './stripe-invoice-paid';
import { WebhookStripeInvoiceWithPaymentErrorService } from './stripe-invoice-with-payment-error';
import { WebhookStripeSubscriptionContractCanceledService } from './stripe-subscription-contract-canceled';
import { WebhookStripeSubscriptionUpdateService } from './stripe-subscription-contract-update';
import { WebhookVideosService } from './videos';

export const WebhookServices = [
  WebhookStripeService,
  WebhookStripeInvoiceCreatedService,
  WebhookStripeSubscriptionContractCanceledService,
  WebhookStripeInvoicePaidService,
  WebhookStripeInvoiceWithPaymentErrorService,
  WebhookStripeSubscriptionUpdateService,
  WebhookStripeCheckoutSessionService,
  WebhookStripeCheckoutSessionAsyncPaymentSucceededService,
  WebhookStripeCheckoutSessionAsyncPaymentFailedService,
  WebhookVideosService
];
