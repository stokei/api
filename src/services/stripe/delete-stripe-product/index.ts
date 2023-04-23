import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class DeleteStripeProductService
  implements
    IBaseService<string, Promise<Stripe.Response<Stripe.DeletedProduct>>>
{
  async execute(product: string) {
    return stripeClient.products.del(product);
  }
}
