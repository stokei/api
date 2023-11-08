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
        customer_email: data.customerEmail,
        customer_creation: 'if_required',
        payment_method_types: allowedPaymentMethodTypes,
        metadata: {
          order: data.order,
          payment: data.payment,
          paymentMethodType: data.paymentMethodType
        },
        mode: 'payment',
        expand: ['subscription'],
        payment_intent_data: {
          application_fee_amount: data.applicationFeeAmount
        },
        line_items: data.prices.map((currentPrice) => ({
          quantity: currentPrice.quantity,
          adjustable_quantity: {
            enabled: false
          },
          price_data: {
            currency: data.currency,
            unit_amount_decimal: currentPrice?.amount + '',
            product_data: {
              name: currentPrice?.name,
              description: currentPrice?.description
            }
          }
        }))
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
