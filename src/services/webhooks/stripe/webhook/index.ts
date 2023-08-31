import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { hiddenPrivateDataFromObject, IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { WebhookStripeDTO } from '@/dtos/webhooks/webhook-stripe.dto';
import { STRIPE_WEBHOOK_SECRET } from '@/environments';
import { StripeSignatureNotFoundException } from '@/errors';
import { WebhookStripeCheckoutSessionAsyncPaymentFailedService } from '@/services/webhooks/stripe/stripe-checkout-session-async-payment-failed';
import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from '@/services/webhooks/stripe/stripe-checkout-session-async-payment-succeeded';
import { WebhookStripeCheckoutSessionService } from '@/services/webhooks/stripe/stripe-checkout-session-completed';
import { WebhookStripeSubscriptionContractCanceledService } from '@/services/webhooks/stripe/stripe-subscription-contract-canceled';
import { WebhookStripeSubscriptionUpdateService } from '@/services/webhooks/stripe/stripe-subscription-contract-update';

@Injectable()
export class WebhookStripeService implements IBaseService<WebhookStripeDTO> {
  constructor(
    private readonly webhookStripeCheckoutSessionService: WebhookStripeCheckoutSessionService,
    private readonly webhookStripeSubscriptionUpdateService: WebhookStripeSubscriptionUpdateService,
    private readonly webhookStripeSubscriptionContractCanceledService: WebhookStripeSubscriptionContractCanceledService,
    private readonly webhookStripeCheckoutSessionAsyncPaymentSucceededService: WebhookStripeCheckoutSessionAsyncPaymentSucceededService,
    private readonly webhookStripeCheckoutSessionAsyncPaymentFailedService: WebhookStripeCheckoutSessionAsyncPaymentFailedService
  ) {}

  async execute({ body, signature }: WebhookStripeDTO) {
    let event: Stripe.Event;
    const logger = new Logger(WebhookStripeService.name);

    try {
      event = stripeClient.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      if (!signature) {
        throw new StripeSignatureNotFoundException();
      }
    }

    const eventObject: any = event?.data.object;
    const eventType = event?.type;
    const connectAccount = event?.account;

    try {
      switch (eventType) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const customerSubscription: Stripe.Subscription = eventObject;
          const cancelStatus = ['incomplete_expired', 'canceled'];
          if (cancelStatus.includes(customerSubscription.status)) {
            return await this.webhookStripeSubscriptionContractCanceledService.execute(
              customerSubscription.id
            );
          }
          return await this.webhookStripeSubscriptionUpdateService.execute({
            stripeSubscription: customerSubscription.id,
            startAt: customerSubscription.current_period_start * 1000,
            endAt: customerSubscription.current_period_end * 1000
          });
        case 'checkout.session.completed':
          const stripeCheckoutSessionCompleted: Stripe.Checkout.Session =
            eventObject;
          return await this.webhookStripeCheckoutSessionService.execute({
            stripeCheckoutSession: stripeCheckoutSessionCompleted?.id,
            stripeAccount: connectAccount
          });
        case 'checkout.session.async_payment_succeeded':
          const stripeCheckoutSessionPaymentSucceeded: Stripe.Checkout.Session =
            eventObject;
          return await this.webhookStripeCheckoutSessionAsyncPaymentSucceededService.execute(
            {
              stripeCheckoutSession: stripeCheckoutSessionPaymentSucceeded?.id,
              stripeAccount: connectAccount
            }
          );
        case 'checkout.session.async_payment_failed':
          const stripeCheckoutSessionPaymentFailed: Stripe.Checkout.Session =
            eventObject;
          return await this.webhookStripeCheckoutSessionAsyncPaymentFailedService.execute(
            {
              stripeCheckoutSession: stripeCheckoutSessionPaymentFailed?.id,
              stripeAccount: connectAccount
            }
          );
        case 'payment_intent.succeeded':
        case 'payment_intent.payment_failed':
        default:
          return { status: HttpStatus.OK };
      }
    } catch (error) {
      logger.error(
        hiddenPrivateDataFromObject(
          {
            error: error?.message,
            eventType,
            connectAccount
          },
          DEFAULT_PRIVATE_DATA
        )
      );
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}