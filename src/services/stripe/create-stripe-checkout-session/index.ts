import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeCheckoutSessionDTO } from '@/dtos/stripe/create-stripe-checkout-session.dto';

@Injectable()
export class CreateStripeCheckoutSessionService
  implements
    IBaseService<
      CreateStripeCheckoutSessionDTO,
      Promise<Stripe.Response<Stripe.Checkout.Session>>
    >
{
  async execute(
    data: CreateStripeCheckoutSessionDTO
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    return stripeClient.checkout.sessions.create(
      {
        cancel_url: data.cancelUrl,
        success_url: data.successUrl,
        currency: data.currency,
        client_reference_id: data.customerReference,
        customer: data.customer,
        mode: data.mode,
        expand: ['subscription'],
        line_items: data.prices.map((currentPrice) => ({
          price: currentPrice.price,
          quantity: currentPrice.quantity,
          adjustable_quantity: {
            enabled: false
          }
        })),
        ...(data.stripeAccount &&
          data.mode == 'subscription' && {
            subscription_data: {
              application_fee_percent: data.applicationFeePercentage
            }
          }),
        ...(data.stripeAccount &&
          data.mode == 'payment' && {
            payment_intent_data: {
              application_fee_amount: data.applicationFeePercentage
            }
          })
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
