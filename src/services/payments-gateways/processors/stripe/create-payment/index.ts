import { Injectable } from '@nestjs/common';

import { stripeClient } from '@/clients/stripe';
import {
  CreatePaymentByPaymentProcessorDTO,
  IBaseServiceCreatePaymentByPaymentProcessor
} from '@/dtos/payments-gateway/create-payment-by-gateway-processor.dto';
import { PluginType } from '@/enums/plugin-type.enum';
import { CheckoutModel } from '@/models/checkout.model';
import { FindPluginByTypeService } from '@/services/plugins/find-plugin-by-type';

@Injectable()
export class StripeCreatePaymentProcessorService
  implements IBaseServiceCreatePaymentByPaymentProcessor
{
  constructor(
    private readonly findPluginByTypeService: FindPluginByTypeService
  ) {}

  async execute(
    data: CreatePaymentByPaymentProcessorDTO
  ): Promise<CheckoutModel> {
    const credentials = await this.findPluginByTypeService.execute({
      app: data?.app?.id,
      parent: data?.app?.id,
      type: PluginType.STRIPE
    });

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
          ...(credentials?.publicKey && {
            application_fee_amount: data?.payment.feeAmount
          }),
          metadata: {
            payment: data?.payment?.id
          }
        },
        metadata: {
          payment: data?.payment?.id
        }
      },
      { stripeAccount: credentials?.publicKey }
    );
    return new CheckoutModel({
      payment: data?.payment.id,
      url: stripeResponse.url
    });
  }
}
