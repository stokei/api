import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class FindStripeCustomerByIdService
  implements
    IBaseService<
      string,
      Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>
    >
{
  async execute(
    customer: string,
    stripeAccount?: string
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    return await stripeClient.customers.retrieve(customer, {
      stripeAccount
    });
  }
}
