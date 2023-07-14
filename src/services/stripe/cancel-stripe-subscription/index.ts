import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CancelStripeSubscriptionDTO } from '@/dtos/stripe/cancel-stripe-subscription.dto';

@Injectable()
export class CancelStripeSubscriptionService
  implements
    IBaseService<
      CancelStripeSubscriptionDTO,
      Promise<Stripe.Response<Stripe.Subscription>>
    >
{
  async execute(
    data: CancelStripeSubscriptionDTO
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return stripeClient.subscriptions.cancel(data.subscription, {
      stripeAccount: data.stripeAccount
    });
  }
}
