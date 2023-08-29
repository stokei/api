import { WebhookFindOrCreateStripePaymentMethodService } from './find-or-create-stripe-payment-method';
import { WebhookStripeCheckoutSessionAsyncPaymentFailedService } from './stripe-checkout-session-async-payment-failed';
import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from './stripe-checkout-session-async-payment-succeeded';
import { WebhookStripeCheckoutSessionService } from './stripe-checkout-session-completed';
import { WebhookStripeSubscriptionContractCanceledService } from './stripe-subscription-contract-canceled';
import { WebhookStripeSubscriptionUpdateService } from './stripe-subscription-contract-update';
import { WebhookStripeService } from './webhook';

export const WebhookStripeServices = [
  WebhookStripeService,
  WebhookStripeSubscriptionContractCanceledService,
  WebhookStripeSubscriptionUpdateService,
  WebhookStripeCheckoutSessionService,
  WebhookStripeCheckoutSessionAsyncPaymentSucceededService,
  WebhookStripeCheckoutSessionAsyncPaymentFailedService,
  WebhookFindOrCreateStripePaymentMethodService
];
