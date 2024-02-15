import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeAccountOnboardingLinkDTO } from '@/dtos/stripe/create-stripe-account-onboarding-link.dto';

@Injectable()
export class CreateStripeAccountOnboardingLinkService
  implements
    IBaseService<
      CreateStripeAccountOnboardingLinkDTO,
      Promise<Stripe.Response<Stripe.AccountLink>>
    >
{
  async execute(
    data: CreateStripeAccountOnboardingLinkDTO
  ): Promise<Stripe.Response<Stripe.AccountLink>> {
    const link = await stripeClient.accountLinks.create({
      type: 'account_onboarding',
      refresh_url: data.refreshUrl,
      return_url: data.returnUrl,
      account: data.stripeAccount
    });
    return link;
  }
}
