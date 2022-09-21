import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { WebhookStripeDTO } from '@/dtos/webhooks/webhook-stripe.dto';
import { STRIPE_WEBHOOK_SECRET } from '@/environments';
import { StripeSignatureNotFoundException } from '@/errors';
import { WebhookStripeInvoiceCreatedService } from '@/services/webhooks/stripe-invoice-created';
import { WebhookStripeSubscriptionContractCanceledService } from '@/services/webhooks/stripe-subscription-contract-canceled';

@Injectable()
export class WebhookStripeService implements IBaseService<WebhookStripeDTO> {
  constructor(
    private readonly webhookStripeInvoiceCreatedService: WebhookStripeInvoiceCreatedService,
    private readonly webhookStripeSubscriptionContractCanceledService: WebhookStripeSubscriptionContractCanceledService
  ) {}

  async execute({ body, signature }: WebhookStripeDTO) {
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

    const eventObject: any = event?.data.object;
    const eventType = event?.type;
    const connectAccount = event?.account;

    const handlers = {
      'customer.subscription.deleted': async () => {
        const data: Stripe.Subscription = eventObject;
        return await this.webhookStripeSubscriptionContractCanceledService.execute(
          data.id
        );
      },
      'invoice.created': async () => {
        const data: Stripe.Invoice = eventObject;
        return await this.webhookStripeInvoiceCreatedService.execute({
          invoice: data.id,
          stripeAccount: connectAccount
        });
      },
      'invoice.paid': async () => {
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        const data: Stripe.Invoice = eventObject;
        Logger.log(
          'Invoice payment is successful -> ' + data.id,
          WebhookStripeService.name
        );
      },
      'invoice.payment_failed': async () => {
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        const data: Stripe.Invoice = eventObject;
        Logger.warn(
          'Invoice payment is failed -> ' + data.id,
          WebhookStripeService.name
        );
      }
    };

    const bootstrapWebhook = handlers[eventType];
    if (bootstrapWebhook) {
      return { status: (await bootstrapWebhook()) || HttpStatus.OK };
    }
    return { status: HttpStatus.OK };
  }
}
