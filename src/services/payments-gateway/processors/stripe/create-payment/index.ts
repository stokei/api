import { Injectable } from '@nestjs/common';

import { stripeClient } from '@/clients/stripe';
import {
  CreatePaymentByPaymentProcessorDTO,
  IBaseServiceCreatePaymentByPaymentProcessor
} from '@/dtos/payments-gateway/create-payment-by-gateway-processor.dto';
import { CheckoutModel } from '@/models/checkout.model';
import { getTotalFeeAmount } from '@/utils/get-fee-amount';

@Injectable()
export class StripeCreatePaymentProcessorService
  implements IBaseServiceCreatePaymentByPaymentProcessor
{
  async execute(
    data: CreatePaymentByPaymentProcessorDTO
  ): Promise<CheckoutModel> {
    const stripeResponse = await stripeClient.checkout.sessions.create(
      {
        mode: 'subscription',
        success_url: data?.successURL,
        cancel_url: data?.cancelURL,
        currency: data.currency?.id,
        payment_intent_data: {
          capture_method: 'automatic',
          ...(data?.app?.stripeAccount && {
            application_fee_amount: getTotalFeeAmount({
              amount: data.payment.totalAmount,
              paymentGatewayType: data.paymentGatewayType,
              paymentMethodType: data.paymentMethodType
            })
          })
        },
        metadata: {
          payment: data.payment?.id
        }
      },
      { stripeAccount: data?.app?.stripeAccount }
    );
    return new CheckoutModel({
      payment: data.payment.id,
      url: stripeResponse.url
    });
  }
}
