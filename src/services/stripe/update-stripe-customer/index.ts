import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { UpdateStripeCustomerDTO } from '@/dtos/stripe/update-stripe-customer.dto';

@Injectable()
export class UpdateStripeCustomerService
  implements
    IBaseService<
      UpdateStripeCustomerDTO,
      Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>
    >
{
  async execute({
    data,
    where
  }: UpdateStripeCustomerDTO): Promise<
    Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>
  > {
    return stripeClient.customers.update(
      where.stripeCustomer,
      cleanObject({
        name: data.name,
        email: data.email
      }),
      { stripeAccount: where.stripeAccount }
    );
  }
}
