import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeCustomerDTO } from '@/dtos/stripe/create-stripe-customer.dto';

@Injectable()
export class CreateStripeCustomerService
  implements
    IBaseService<
      CreateStripeCustomerDTO,
      Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>
    >
{
  async execute(
    data: CreateStripeCustomerDTO
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    return stripeClient.customers.create(
      {
        name: data.name,
        email: data.email,
        metadata: {
          parent: data.parent
        }
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
