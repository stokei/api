import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripePaymentIntentDTO } from '@/dtos/stripe/create-stripe-payment-intent.dto';

@Injectable()
export class CreateStripePaymentIntentService
  implements
    IBaseService<
      CreateStripePaymentIntentDTO,
      Promise<Stripe.Response<Stripe.PaymentIntent>>
    >
{
  async execute(
    data: CreateStripePaymentIntentDTO
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return stripeClient.paymentIntents.create(
      {
        amount: data.payment?.totalAmount,
        currency: data.currency,
        automatic_payment_methods: {
          enabled: true
        },
        metadata: {
          order: data.order?.id,
          payment: data.payment?.id
        },
        application_fee_amount: data.feeAmount
      },
      { stripeAccount: data?.app?.stripeAccount }
    );
  }
}
