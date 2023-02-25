import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeSubscriptionDTO } from '@/dtos/stripe/create-stripe-subscription.dto';
import { APPLICATION_FEE_PERCENT } from '@/environments';

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
    const startPaymentWhenSubscriptionIsCreated =
      !!data.startPaymentWhenSubscriptionIsCreated;
    return stripeClient.subscriptions.create(
      {
        currency: data.currency,
        customer: data.customer,
        items: data?.prices?.map((price) => ({
          price: price.price,
          quantity: price.quantity
        })),
        default_payment_method: data?.paymentMethod,
        payment_settings: {
          save_default_payment_method: 'on_subscription'
        },
        ...(startPaymentWhenSubscriptionIsCreated
          ? {
              collection_method: 'charge_automatically'
            }
          : {
              payment_behavior: 'default_incomplete'
            }),
        expand: ['latest_invoice.payment_intent'],
        ...(data.stripeAccount && {
          application_fee_percent: APPLICATION_FEE_PERCENT,
          transfer_data: {
            destination: data.stripeAccount
          }
        })
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
