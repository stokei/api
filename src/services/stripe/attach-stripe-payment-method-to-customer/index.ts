import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { AttachStripePaymentMethodToCustomerDTO } from '@/dtos/stripe/attach-stripe-payment-method-to-customer.dto';

@Injectable()
export class AttachStripePaymentMethodToCustomerService
  implements
    IBaseService<
      AttachStripePaymentMethodToCustomerDTO,
      Promise<Stripe.Response<Stripe.PaymentMethod>>
    >
{
  async execute(
    data: AttachStripePaymentMethodToCustomerDTO
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return stripeClient.paymentMethods.attach(
      data.paymentMethod,
      {
        customer: data.customer
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
