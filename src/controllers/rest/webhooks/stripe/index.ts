import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Logger,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { STRIPE_WEBHOOK_SECRET } from '@/environments';
import { StripeSignatureNotFoundException } from '@/errors/stripe-signature-not-found';
import { CreateVideoService } from '@/services/videos/create-video';

@ApiTags(REST_CONTROLLERS_URL_NAMES.WEBHOOKS_STRIPE)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.WEBHOOKS_STRIPE,
  version: REST_VERSIONS.V1
})
export class WebhookStripeController {
  constructor(private readonly createVideoService: CreateVideoService) {}

  @Post()
  async webhook(
    @Body() body: any,
    @Headers('stripe-signature') signature: string
  ) {
    let event: Stripe.Event;

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

    const eventObject: any = event.data.object;
    const eventType = event.type;
    const connectAccount = event.account;

    Logger.log(
      { signature, eventType, connectAccount },
      WebhookStripeController.name
    );
    Logger.log(eventObject, WebhookStripeController.name);

    const handlers = {
      'checkout.session.completed': () => {
        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        const data: Stripe.Checkout.Session = eventObject;
        Logger.log(
          'Payment is successful and the subscription is created -> ' + data.id,
          WebhookStripeController.name
        );
      },
      'invoice.paid': () => {
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        const data: Stripe.Invoice = eventObject;
        Logger.log(
          'Payment is successful and the subscription is created -> ' + data.id,
          WebhookStripeController.name
        );
      },
      'invoice.payment_failed': () => {
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        const data: Stripe.Invoice = eventObject;
        Logger.log(
          'Payment is successful and the subscription is created -> ' + data.id,
          WebhookStripeController.name
        );
      }
    };

    const bootstrapWebhook = handlers[eventType];
    if (bootstrapWebhook) {
      bootstrapWebhook();
    }
    return { status: HttpStatus.OK };
  }
}
