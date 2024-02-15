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
    const currentApp = data.app;
    const account = await stripeClient.accounts.create({
      type: 'standard',
      email: currentApp.email,
      default_currency: currentApp.currency,
      business_profile: {
        name: currentApp.name
      },
      metadata: {
        appParent: currentApp.parent,
        app: currentApp.id
      }
    });
    return account;
  }
}
