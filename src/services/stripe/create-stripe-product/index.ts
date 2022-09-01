import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeProductDTO } from '@/dtos/stripe/create-stripe-product.dto';

@Injectable()
export class CreateStripeProductService
  implements
    IBaseService<
      CreateStripeProductDTO,
      Promise<Stripe.Response<Stripe.Product>>
    >
{
  async execute(
    data: CreateStripeProductDTO
  ): Promise<Stripe.Response<Stripe.Product>> {
    return stripeClient.products.create(
      {
        name: data.name,
        description: data.description,
        shippable: false,
        metadata: {
          app: data.app
        }
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
