import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeCustomerPortalSessionDTO } from '@/dtos/stripe/create-stripe-customer-portal-session.dto';

@Injectable()
export class CreateStripeCustomerPortalSessionService
  implements
    IBaseService<
      CreateStripeCustomerPortalSessionDTO,
      Promise<Stripe.Response<Stripe.BillingPortal.Session>>
    >
{
  async execute(
    data: CreateStripeCustomerPortalSessionDTO
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return stripeClient.billingPortal.sessions.create(
      {
        customer: data.customer,
        return_url: data.returnUrl,
        ...(data.stripeAccount && { on_behalf_of: data.stripeAccount })
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
