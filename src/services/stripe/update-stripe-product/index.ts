import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { UpdateStripeProductDTO } from '@/dtos/stripe/update-stripe-product.dto';

@Injectable()
export class UpdateStripeProductService
  implements
    IBaseService<
      UpdateStripeProductDTO,
      Promise<Stripe.Response<Stripe.Product | Stripe.DeletedProduct>>
    >
{
  async execute({
    data,
    where
  }: UpdateStripeProductDTO): Promise<
    Stripe.Response<Stripe.Product | Stripe.DeletedProduct>
  > {
    const dataUpdate = cleanObject({
      name: data.name,
      description: data.description
    });
    return stripeClient.products.update(where.stripeProduct, dataUpdate, {
      stripeAccount: where.stripeAccount
    });
  }
}
