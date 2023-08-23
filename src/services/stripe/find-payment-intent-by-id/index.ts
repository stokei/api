import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class FindStripePaymentIntentByIdService
  implements
    IBaseService<string, Promise<Stripe.Response<Stripe.PaymentIntent>>>
{
  async execute(
    paymentIntent: string,
    stripeAccount?: string
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return stripeClient.paymentIntents.retrieve(
      paymentIntent,
      {
        expand: ['payment_method']
      },
      {
        stripeAccount
      }
    );
  }
}
