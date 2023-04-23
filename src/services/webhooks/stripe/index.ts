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
import { WebhookStripeSubscriptionUpdateService } from '@/services/webhooks/stripe-subscription-contract-update';

@Injectable()
export class WebhookStripeService implements IBaseService<WebhookStripeDTO> {
  constructor(
    private readonly webhookStripeInvoiceCreatedService: WebhookStripeInvoiceCreatedService,
    private readonly webhookStripeInvoiceWithPaymentErrorService: WebhookStripeInvoiceWithPaymentErrorService,
    private readonly webhookStripeInvoicePaidService: WebhookStripeInvoicePaidService,
    private readonly webhookStripeSubscriptionUpdateService: WebhookStripeSubscriptionUpdateService,
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
        case 'invoice.created':
          return await this.webhookStripeInvoiceCreatedService.execute({
            invoice: eventObject.id,
            stripeAccount: connectAccount
          });
        case 'invoice.paid':
          return await this.webhookStripeInvoicePaidService.execute({
            invoice: eventObject.id,
            stripeAccount: connectAccount
          });
        case 'invoice.payment_failed':
        case 'invoice.payment_action_required':
          return await this.webhookStripeInvoiceWithPaymentErrorService.execute(
            {
              invoice: eventObject.id,
              stripeAccount: connectAccount
            }
          );
        default:
          return { status: HttpStatus.OK };
      }
    } catch (error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
