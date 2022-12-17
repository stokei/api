import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class FindStripeSubscriptionByIdService
  implements
    IBaseService<string, Promise<Stripe.Response<Stripe.Subscription>>>
{
  async execute(
    subscription: string,
    stripeAccount?: string
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return stripeClient.subscriptions.retrieve(subscription, {
      stripeAccount
    });
  }
}
