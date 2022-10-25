import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripePriceDTO } from '@/dtos/stripe/create-stripe-price.dto';
import { PriceType } from '@/enums/price-type.enum';

@Injectable()
export class CreateStripePriceService
  implements
    IBaseService<CreateStripePriceDTO, Promise<Stripe.Response<Stripe.Price>>>
{
  async execute(
    data: CreateStripePriceDTO
  ): Promise<Stripe.Response<Stripe.Price>> {
    return stripeClient.prices.create(
      {
        currency: data.currency,
        product: data.stripeProduct,
        unit_amount: data.amount,
        recurring: data.type === PriceType.RECURRING && {
          interval:
            data.recurring?.interval?.toLowerCase() as Stripe.PriceCreateParams.Recurring.Interval,
          interval_count: data.recurring?.intervalCount
        },
        metadata: {
          app: data.app
        }
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
