import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeAccountLoginLinkDTO } from '@/dtos/stripe/create-stripe-account-login-link.dto';

@Injectable()
export class CreateStripeAccountLoginLinkService
  implements
    IBaseService<
      CreateStripeAccountLoginLinkDTO,
      Promise<Stripe.Response<Stripe.LoginLink>>
    >
{
  async execute(
    data: CreateStripeAccountLoginLinkDTO
  ): Promise<Stripe.Response<Stripe.LoginLink>> {
    const link = await stripeClient.accounts.createLoginLink(
      data.stripeAccount
    );
    return link;
  }
}
