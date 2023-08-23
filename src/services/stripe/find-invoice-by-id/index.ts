import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class FindStripeInvoiceByIdService
  implements IBaseService<string, Promise<Stripe.Response<Stripe.Invoice>>>
{
  async execute(
    invoice: string,
    stripeAccount?: string
  ): Promise<Stripe.Response<Stripe.Invoice>> {
    return stripeClient.invoices.retrieve(
      invoice,
      {
        expand: ['payment_intent', 'subscription']
      },
      {
        stripeAccount
      }
    );
  }
}
