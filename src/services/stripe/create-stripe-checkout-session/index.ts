import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeCheckoutSessionDTO } from '@/dtos/stripe/create-stripe-checkout-session.dto';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

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
    const paymentMethodTypes: Record<
      PaymentMethodType,
      Array<Stripe.Checkout.SessionCreateParams.PaymentMethodType>
    > = {
      [PaymentMethodType.PIX]: ['pix'],
      [PaymentMethodType.CARD]: ['card'],
      [PaymentMethodType.BOLETO]: ['boleto']
    };
    const allowedPaymentMethodTypes =
      paymentMethodTypes[data.paymentMethodType];

    return stripeClient.checkout.sessions.create(
      {
        cancel_url: data.cancelUrl,
        success_url: data.successUrl,
        currency: data.currency,
        client_reference_id: data.customerReference,
        customer: data.customer,
        payment_method_types: allowedPaymentMethodTypes,
        metadata: {
          order: data.order,
          payment: data.payment,
          paymentMethodType: data.paymentMethodType
        },
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
              application_fee_amount: data.applicationFeeAmount
            }
          })
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
