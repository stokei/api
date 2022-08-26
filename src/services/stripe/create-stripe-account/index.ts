import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeAccountDTO } from '@/dtos/stripe/create-stripe-account.dto';

@Injectable()
export class CreateStripeAccountService
  implements
    IBaseService<
      CreateStripeAccountDTO,
      Promise<Stripe.Response<Stripe.Account>>
    >
{
  async execute(
    data: CreateStripeAccountDTO
  ): Promise<Stripe.Response<Stripe.Account>> {
    const account = await stripeClient.accounts.create({
      type: 'express',
      email: data.appEmail,
      metadata: {
        app: data.app
      }
    });
    return account;
  }
}
