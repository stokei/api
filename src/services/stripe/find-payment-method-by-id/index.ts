import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class FindStripePaymentMethodByIdService
  implements
    IBaseService<string, Promise<Stripe.Response<Stripe.PaymentMethod>>>
{
  async execute(
    paymentMethod: string,
    stripeAccount?: string
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return stripeClient.paymentMethods.retrieve(paymentMethod, {
      stripeAccount
    });
  }
}
