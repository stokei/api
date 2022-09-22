import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { WebhookStripeDTO } from '@/dtos/webhooks/webhook-stripe.dto';
import { STRIPE_WEBHOOK_SECRET } from '@/environments';
import { StripeSignatureNotFoundException } from '@/errors';
import { WebhookStripeInvoiceCreatedService } from '@/services/webhooks/stripe-invoice-created';
import { WebhookStripeInvoicePaidService } from '@/services/webhooks/stripe-invoice-paid';
import { WebhookStripeInvoiceWithPaymentErrorService } from '@/services/webhooks/stripe-invoice-with-payment-error';
import { WebhookStripeSubscriptionContractCanceledService } from '@/services/webhooks/stripe-subscription-contract-canceled';

@Injectable()
export class WebhookStripeService implements IBaseService<WebhookStripeDTO> {
  constructor(
    private readonly webhookStripeInvoiceCreatedService: WebhookStripeInvoiceCreatedService,
    private readonly webhookStripeInvoiceWithPaymentErrorService: WebhookStripeInvoiceWithPaymentErrorService,
    private readonly webhookStripeInvoicePaidService: WebhookStripeInvoicePaidService,
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

    switch (eventType) {
      case 'customer.subscription.deleted':
        return await this.webhookStripeSubscriptionContractCanceledService.execute(
          eventObject.id
        );
      case 'invoice.created':
        return await this.webhookStripeInvoiceCreatedService.execute({
          invoice: eventObject.id,
          stripeAccount: connectAccount
        });
      case 'invoice.paid':
        return await this.webhookStripeInvoicePaidService.execute(
          eventObject.id,
          connectAccount
        );
      case 'invoice.payment_failed':
      case 'invoice.payment_action_required':
        return await this.webhookStripeInvoiceWithPaymentErrorService.execute(
          eventObject.id,
          connectAccount
        );
      default:
        return { status: HttpStatus.OK };
    }
  }
}
