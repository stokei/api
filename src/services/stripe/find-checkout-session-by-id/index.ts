import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class FindStripeCheckoutSessionByIdService
  implements
    IBaseService<string, Promise<Stripe.Response<Stripe.Checkout.Session>>>
{
  async execute(
    checkoutSession: string,
    stripeAccount?: string
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    return stripeClient.checkout.sessions.retrieve(
      checkoutSession,
      {
        expand: [
          'line_items',
          'subscription',
          'payment_intent',
          'customer',
          'subscription.default_payment_method',
          'payment_intent.payment_method'
        ]
      },
      {
        stripeAccount
      }
    );
  }
}
