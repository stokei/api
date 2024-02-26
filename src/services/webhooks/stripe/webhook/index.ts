import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { hiddenPrivateDataFromObject, IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { WebhookStripeDTO } from '@/dtos/webhooks/webhook-stripe.dto';
import { STRIPE_WEBHOOK_SECRET } from '@/environments';
import { StripeSignatureNotFoundException } from '@/errors';
import { WebhookStripePaymentFailedService } from '@/services/webhooks/stripe/stripe-payment-failed';
import { WebhookStripePaymentSucceededService } from '@/services/webhooks/stripe/stripe-payment-succeeded';

@Injectable()
export class WebhookStripeService implements IBaseService<WebhookStripeDTO> {
  constructor(
    private readonly webhookStripePaymentSucceededService: WebhookStripePaymentSucceededService,
    private readonly webhookStripePaymentFailedService: WebhookStripePaymentFailedService
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
        case 'payment_intent.succeeded':
          return await this.webhookStripePaymentSucceededService.execute({
            stripePaymentIntent: eventObject as Stripe.PaymentIntent,
            stripeAccount: connectAccount
          });
        case 'payment_intent.canceled':
        case 'payment_intent.payment_failed':
          return await this.webhookStripePaymentFailedService.execute({
            stripePaymentIntent: eventObject as Stripe.PaymentIntent,
            stripeAccount: connectAccount
          });
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
