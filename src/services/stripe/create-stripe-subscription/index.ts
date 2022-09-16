import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeSubscriptionDTO } from '@/dtos/stripe/create-stripe-subscription.dto';

@Injectable()
export class CreateStripeSubscriptionService
  implements
    IBaseService<
      CreateStripeSubscriptionDTO,
      Promise<Stripe.Response<Stripe.Subscription>>
    >
{
  async execute(
    data: CreateStripeSubscriptionDTO
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return stripeClient.subscriptions.create(
      {
        currency: data.currency,
        customer: data.customer,
        items: [
          {
            price: data.price
          }
        ],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        ...(data.stripeAccount && {
          application_fee_percent: data.applicationFeePercentage,
          transfer_data: {
            destination: data.stripeAccount
          }
        })
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
