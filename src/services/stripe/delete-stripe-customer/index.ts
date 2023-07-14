import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class DeleteStripeCustomerService
  implements
    IBaseService<string, Promise<Stripe.Response<Stripe.DeletedCustomer>>>
{
  async execute(customer: string) {
    return stripeClient.customers.del(customer);
  }
}
