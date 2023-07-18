import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { UpdateStripeSubscriptionDTO } from '@/dtos/stripe/update-stripe-subscription.dto';

@Injectable()
export class UpdateStripeSubscriptionService
  implements
    IBaseService<
      UpdateStripeSubscriptionDTO,
      Promise<Stripe.Response<Stripe.Subscription>>
    >
{
  async execute({
    data,
    where
  }: UpdateStripeSubscriptionDTO): Promise<
    Stripe.Response<Stripe.Subscription>
  > {
    return stripeClient.subscriptions.update(
      where.stripeSubscription,
      {
        cancel_at_period_end: !data.automaticRenew
      },
      { stripeAccount: where.stripeAccount }
    );
  }
}
