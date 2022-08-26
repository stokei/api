import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeAccountUpdateLinkDTO } from '@/dtos/stripe/create-stripe-account-update-link.dto';

@Injectable()
export class CreateStripeAccountUpdateLinkService
  implements
    IBaseService<
      CreateStripeAccountUpdateLinkDTO,
      Promise<Stripe.Response<Stripe.AccountLink>>
    >
{
  async execute(
    data: CreateStripeAccountUpdateLinkDTO
  ): Promise<Stripe.Response<Stripe.AccountLink>> {
    const link = await stripeClient.accountLinks.create({
      type: 'account_update',
      refresh_url: data.refreshUrl,
      return_url: data.returnUrl,
      account: data.stripeAccount
    });
    return link;
  }
}
