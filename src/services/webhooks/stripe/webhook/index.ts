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

@Injectable()
export class WebhookStripeService implements IBaseService<WebhookStripeDTO> {
  constructor(
    private readonly webhookStripeCheckoutSessionService: WebhookStripeCheckoutSessionService,
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
        case 'checkout.session.completed':
          return await this.webhookStripeCheckoutSessionService.execute({
            stripeCheckoutSession: eventObject as Stripe.Checkout.Session,
            stripeAccount: connectAccount
          });
        case 'checkout.session.async_payment_succeeded':
          return await this.webhookStripeCheckoutSessionAsyncPaymentSucceededService.execute(
            {
              stripeCheckoutSession: eventObject as Stripe.Checkout.Session,
              stripeAccount: connectAccount
            }
          );
        case 'checkout.session.async_payment_failed':
          return await this.webhookStripeCheckoutSessionAsyncPaymentFailedService.execute(
            {
              stripeCheckoutSession: eventObject as Stripe.Checkout.Session,
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
