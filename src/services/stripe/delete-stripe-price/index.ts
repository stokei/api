import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class DeleteStripePriceService
  implements IBaseService<string, Promise<Stripe.Response<Stripe.Price>>>
{
  async execute(price: string) {
    return stripeClient.prices.update(price, {
      active: false
    });
  }
}
