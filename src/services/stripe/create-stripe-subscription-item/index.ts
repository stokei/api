import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeSubscriptionItemDTO } from '@/dtos/stripe/create-stripe-subscription-item.dto';

@Injectable()
export class CreateStripeSubscriptionItemService
  implements
    IBaseService<
      CreateStripeSubscriptionItemDTO,
      Promise<Stripe.Response<Stripe.SubscriptionItem>>
    >
{
  async execute(
    data: CreateStripeSubscriptionItemDTO
  ): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
    return stripeClient.subscriptionItems.create(
      {
        subscription: data.subscription,
        price: data.price,
        quantity: data.quantity
      },
      { stripeAccount: data.stripeAccount }
    );
  }
}
