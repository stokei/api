import { Injectable } from '@nestjs/common';

import { stripeClient } from '@/clients/stripe';
import {
  CreatePaymentByPaymentProcessorDTO,
  IBaseServiceCreatePaymentByPaymentProcessor
} from '@/dtos/payments-gateway/create-payment-by-gateway-processor.dto';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class StripeCreatePaymentProcessorService
  implements IBaseServiceCreatePaymentByPaymentProcessor
{
  async execute(
    data: CreatePaymentByPaymentProcessorDTO
  ): Promise<CheckoutModel> {
    const stripeResponse = await stripeClient.checkout.sessions.create(
      {
        mode: 'payment',
        success_url: data?.successURL,
        cancel_url: data?.cancelURL,
        currency: data?.currency?.id,
        customer_email: data?.payer.email,
        line_items: data?.items?.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: data?.currency.id,
            product_data: {
              name: item.name
            },
            unit_amount_decimal: item.amount + ''
          }
        })),
        payment_intent_data: {
          capture_method: 'automatic',
          ...(data?.app?.stripeAccount && {
            application_fee_amount: data?.payment.feeAmount
          })
        },
        metadata: {
          payment: data?.payment?.id
        }
      },
      { stripeAccount: data?.app?.stripeAccount }
    );
    return new CheckoutModel({
      payment: data?.payment.id,
      url: stripeResponse.url
    });
  }
}
