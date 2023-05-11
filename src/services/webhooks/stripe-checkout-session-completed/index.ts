import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { FindSubscriptionContractByStripeCheckoutSessionService } from '@/services/subscription-contracts/find-subscription-contract-by-stripe-checkout-session';
import { UpdateSubscriptionContractService } from '@/services/subscription-contracts/update-subscription-contract';

import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from '../stripe-checkout-session-async-payment-succeeded';

@Injectable()
export class WebhookStripeCheckoutSessionService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly findSubscriptionContractByStripeCheckoutSessionService: FindSubscriptionContractByStripeCheckoutSessionService,
    private readonly updateSubscriptionContractService: UpdateSubscriptionContractService,
    private readonly webhookStripeCheckoutSessionAsyncPaymentSucceededService: WebhookStripeCheckoutSessionAsyncPaymentSucceededService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession
      );
    const stripeSubscription: Stripe.Subscription =
      stripeCheckoutSession?.subscription as Stripe.Subscription;
    const subscriptionContract =
      await this.findSubscriptionContractByStripeCheckoutSessionService.execute(
        stripeCheckoutSession?.id
      );

    await this.updateSubscriptionContractService.execute({
      data: {
        stripeSubscription: stripeSubscription?.id,
        startAt:
          stripeSubscription.current_period_start &&
          stripeSubscription.current_period_start * 1000,
        endAt:
          stripeSubscription.current_period_end &&
          stripeSubscription.current_period_end * 1000,
        updatedBy: subscriptionContract.updatedBy
      },
      where: {
        app: subscriptionContract.app,
        subscriptionContract: subscriptionContract.id
      }
    });

    if (stripeCheckoutSession?.payment_status === 'paid') {
      await this.webhookStripeCheckoutSessionAsyncPaymentSucceededService.execute(
        {
          stripeAccount: data.stripeAccount,
          stripeCheckoutSession: stripeCheckoutSession?.id
        }
      );
    }
    return HttpStatus.OK;
  }
}
